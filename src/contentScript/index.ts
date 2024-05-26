import { message_trigger_generate_web_content, message_trigger_get_document } from '@/type'
import { Readability } from '@mozilla/readability'

console.info('contentScript is running')
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === message_trigger_generate_web_content) {
    console.info('generate_web_content', document)
    const d = new DOMParser().parseFromString(document.documentElement.outerHTML, 'text/html')
    d.body = document.body.cloneNode(true) as HTMLBodyElement
    const article = new Readability(d).parse()
    chrome.runtime.sendMessage({ type: message_trigger_get_document, content: article })
  }
})
