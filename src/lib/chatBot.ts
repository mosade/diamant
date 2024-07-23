import { ChatOpenAI } from '@langchain/openai'
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableWithMessageHistory } from '@langchain/core/runnables'
import { Runnable } from '@langchain/core/dist/runnables/base'
import { AIBasisConfig, AICategory, Message } from '@/type'

const ChatModelWrapper = {
  [AICategory.DeepSeek]: ChatOpenAI,
  [AICategory.OpenAI]: ChatOpenAI,
}

export class ChatBot {
  withMessageHistory: Runnable | null = null
  messageHistories: Record<string, InMemoryChatMessageHistory> = {}
  config = {
    configurable: {
      sessionId: 'abc2',
    },
  }

  constructor(params: AIBasisConfig) {
    this.init(params)
  }

  init(params: AIBasisConfig) {
    const { url, apiKey, model: modelName, name } = params
    const chatModel = ChatModelWrapper[name as AICategory]
    const model = new chatModel({
      streaming: true,
      apiKey,
      model: modelName as string, configuration: {
        baseURL: url,
      },
    })
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `1. 你的任务是对提供的网页内容进行总结。
        2. 请仔细阅读整个网页，理解其主要主题和关键信息。
        3. 在总结中，请包括网页的主要观点、重要数据和任何显著的结论或建议。
        4. 确保你的总结既精炼又全面，使用适合目标读者的语言和风格。
        5. 将结果通过markdown的形式返回
        6. 结果需要中文的形式返回`,
      ],
      ['placeholder', '{chat_history}'],
      ['human', '{input}'],
    ])
    const chain = prompt.pipe(model)
    this.withMessageHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: async (sessionId) => {
        if (this.messageHistories[sessionId] === undefined) {
          this.messageHistories[sessionId] = new InMemoryChatMessageHistory()
        }
        return this.messageHistories[sessionId]
      },
      inputMessagesKey: 'input',
      historyMessagesKey: 'chat_history',
    })

  }

  async chat(message: Message, callBack: (response: string) => void) {
    const stream = await this.withMessageHistory!.stream(
      {
        input: message.content,
      },
      this.config,
    )
    for await (const chunk of stream) {
      // console.log("|", chunk.content);
      callBack(chunk.content)
    }
  }

  clearMessageHistory() {
    Object.keys(this.messageHistories).forEach((key) => {
      this.messageHistories[key].clear()
    })
  }
}
