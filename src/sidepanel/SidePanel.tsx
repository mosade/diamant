import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useRef, useState } from 'react'
import { message_trigger_generate_web_content, message_trigger_get_document } from '@/type'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useGetAiConfig } from '@/lib/hook/useGetAiConfig'
import { useChatBot } from '@/lib/hook/useChatBot'

export const SidePanel = () => {
  const { aiConfigs, setAiConfigs } = useGetAiConfig()

  const [activeAi, setActiveAi] = useState<string>('')


  const { chat, messages } = useChatBot(aiConfigs.find((aiConfig) => aiConfig.name === activeAi))
  const displayedMessages = messages.filter((message) => message.character !== 'placeholder')
  const getWebContentSummary = ((textContent: string) => {
    console.log('getWebContentSummary')
    chat({character:'placeholder',content:textContent})
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
  return (
    <main>
      <Select value={activeAi} onValueChange={setActiveAi} disabled={aiConfigs.length <= 0}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="select a AI" />
        </SelectTrigger>
        <SelectContent>
          {aiConfigs.map((aiConfig) => (
            <SelectItem key={aiConfig.name} value={aiConfig.name}>{aiConfig.name}</SelectItem>))}
        </SelectContent>
      </Select>
      <section>
        <Button onClick={tigerGenerateSummary}>generate summary</Button>
        {displayedMessages.map((message, index) => (
          <Card key={index}>
            <CardTitle>{message.character}</CardTitle>
            <CardContent>{message.content}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default SidePanel
