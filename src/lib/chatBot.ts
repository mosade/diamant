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
        `- Please provide a thorough summary of the provided text, extracting key points and central themes. Ensure the summary is detailed and comprehensive, offering readers a clear understanding of the text's content without requiring them to read it in full. Your summary should be clear and concise, focusing on conveying the main ideas effectively.
        - Here is a example the returned content needs to follow the following structure :
        "
         ### 全文总结
         本文介绍了..........
         ### 要点
         1. xxxxxx
         2. xxxxxx
         ### 观点
         1. xxxxxx
         2. xxxxxx
        "
        - Return the result as markdown
        - Return the result in Chinese
        `,
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
