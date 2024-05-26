import { AIBasisConfig } from '@/type'

export async function requestStreamApi<T extends any>(fetchCall: () => Promise<Response>, callBack: (response: T[]) => void) {
  for await (let chunk of streamingFetch(fetchCall)) {
    // console.log(chunk)
    const responses = chunk.split('\n\n')
      .map((item) => (item.replace('data:', '').trim()))
      .filter(Boolean)
      .map((item) => {
        if (item === '[DONE]') {
          return ''
        }
        return JSON.parse(item)
      })
      .filter(Boolean)
    callBack(responses)
  }
}

async function* streamingFetch(fetchCall: () => Promise<Response>) {

  const response = await fetchCall()
  if (!response.body) return
  // Attach Reader
  const reader = response.body.getReader()
  while (true) {
    // wait for next encoded chunk
    const { done, value } = await reader.read()
    // check if stream is done
    if (done) break
    // Decodes data chunk and yields it
    yield (new TextDecoder().decode(value))
  }
}

export function fetchCompCompletions(params: AIBasisConfig&{contents:string[]}) {
  const { apiKey, url, model,contents=[] } = params
  return fetch(`${params.url}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      'model': model,
      'messages': [
        { 'role': 'system', 'content': '你好，AI。你的任务是对提供的网页内容进行总结。请仔细阅读整个网页，理解其主要主题和关键信息。在总结中，请包括网页的主要观点、重要数据和任何显著的结论或建议。确保你的总结既精炼又全面，使用适合目标读者的语言和风格。完成初稿后，请自我评估你的总结，并根据需要进行调整以确保信息的准确性和表达的清晰性。将结果通过markdown的形式返回给我祝你好运！' },
        ...contents.map((content) => ({ 'role': 'user', 'content': content })),
        // { 'role': 'user', 'content': 'Hello!' },
      ],
      'stream': true,
    }),
  })

}
