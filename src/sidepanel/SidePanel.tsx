import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useRef, useState } from 'react'
import { message_trigger_generate_web_content, message_trigger_get_document } from '@/type'
import { Button } from '@/components/ui/button'
import { useGetAiConfig } from '@/lib/hook/useGetAiConfig'
import { useChatBot } from '@/lib/hook/useChatBot'
import { MessageList } from '@/sidepanel/component/MessageList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

export const SidePanel = () => {
  const { aiConfigs, setAiConfigs } = useGetAiConfig()

  const [activeAi, setActiveAi] = useState<string>('')

  const [inputMessage, setInputMessage] = useState<string>('')
  const { chat, messages } = useChatBot(aiConfigs.find((aiConfig) => aiConfig.name === activeAi))
  const getWebContentSummary = ((textContent: string) => {
    console.log('getWebContentSummary')
    chat({ character: 'placeholder', content: textContent })
  })
  const getWebContentSummaryRef = useRef(getWebContentSummary)
  getWebContentSummaryRef.current = getWebContentSummary


  useEffect(() => {
    const subscription = (message: any) => {
      if (message.type === message_trigger_get_document) {
        console.log(message)
        getWebContentSummaryRef.current(message.content.textContent)
      }
    }
    chrome.runtime.onMessage.addListener(subscription)
    return () => chrome.runtime.onMessage.removeListener(subscription)
  }, [])
  const tigerGenerateSummary = () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        if (!tabs[0].id) return
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            type: message_trigger_generate_web_content,
          },
        )
      },
    )
  }

  const handleSendMessage=()=>{
    chat({character:'user',content:inputMessage})
    setInputMessage('')
  }
  return (
    <main className="h-screen flex flex-col p-2 bg-slate-50 gap-2">
      <Select value={activeAi} onValueChange={setActiveAi} disabled={aiConfigs.length <= 0}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select a AI" />
        </SelectTrigger>
        <SelectContent>
          {aiConfigs.map((aiConfig) => (
            <SelectItem key={aiConfig.name} value={aiConfig.name}>{aiConfig.name}</SelectItem>))}
        </SelectContent>
      </Select>
      <section className="overflow-hidden flex-1 flex flex-col gap-2">
        <div className="overflow-hidden flex-1">
          {messages.length <= 0 ? <div className="h-full flex justify-center items-center">
              <Button variant="ghost" onClick={tigerGenerateSummary} disabled={messages.length > 0||!activeAi}>😍 Generate
                summary</Button>
            </div> :
            <ScrollArea className="h-full w-full rounded-md border p-4">
              <MessageList messages={messages}></MessageList>
            </ScrollArea>
          }
        </div>
        <div className="flex gap-2">
          <Input className="flex-1" value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)}></Input>
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </section>
    </main>
  )
}

export default SidePanel
