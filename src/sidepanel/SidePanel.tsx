import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useRef, useState } from 'react'
import { message_trigger_generate_web_content, message_trigger_get_document } from '@/type'
import { Button } from '@/components/ui/button'
import { useGetAiConfig } from '@/lib/hook/useGetAiConfig'
import { useChatBot } from '@/lib/hook/useChatBot'
import { MessageList } from '@/sidepanel/component/MessageList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { CurrentUsedAiToken, getAiConfig, getCurrentUsedAi, setAiConfig, setCurrentUsedAi } from '@/lib/storage'
import { GearIcon } from '@radix-ui/react-icons'

export const SidePanel = () => {
  const { aiConfigs, setAiConfigs } = useGetAiConfig()
  const [activeAi, setActiveAi] = useState<string>('')

  const [inputMessage, setInputMessage] = useState<string>('')
  const { isPending,chat, messages, resetChat } = useChatBot(aiConfigs.find((aiConfig) => aiConfig.name === activeAi))
  const resetChatRef = useRef(resetChat)

  resetChatRef.current = resetChat
  const getWebContentSummary = ((textContent: string) => {
    console.log('getWebContentSummary')
    chat({ character: 'placeholder', content: textContent, status: 'success' })
  })
  const getWebContentSummaryRef = useRef(getWebContentSummary)
  getWebContentSummaryRef.current = getWebContentSummary

  useEffect(() => {
    getCurrentUsedAi().then((v) => {
      if (v) setActiveAi(v)
    })
  }, [])
  useEffect(() => {
    const subscription = (message: any) => {
      if (message.type === message_trigger_get_document) {
        getWebContentSummaryRef.current(message.content.textContent)
      }
    }
    const handleTabSwitch = (activeInfo: chrome.tabs.TabActiveInfo) => {
      window.close();
    }
    const urlChange = (activeInfo: any) => {
      resetChatRef.current()
    }
    chrome.webNavigation.onHistoryStateUpdated.addListener(urlChange)
    chrome.runtime.onMessage.addListener(subscription)
    chrome.tabs.onActivated.addListener(handleTabSwitch)
    return () => {
      chrome.runtime.onMessage.removeListener(subscription)
      chrome.tabs.onActivated.removeListener(handleTabSwitch)
      chrome.webNavigation.onHistoryStateUpdated.removeListener(urlChange)
    }
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

  const handleSendMessage = () => {
    chat({ character: 'user', content: inputMessage, status: 'success' })
    setInputMessage('')
  }
  const setCurrentActiveAi = (v: string) => {
    setActiveAi(v)
    setCurrentUsedAi(v)
  }
  const handleOpenOptionPage = () => {
    chrome.runtime.openOptionsPage()
  }
  return (
    <main className="h-screen flex flex-col p-2 bg-background text-foreground gap-2">
      <div className="flex justify-between">
        <Select value={activeAi} onValueChange={setCurrentActiveAi}
                disabled={aiConfigs.length <= 0 || messages.length > 0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select a AI" />
          </SelectTrigger>
          <SelectContent>
            {aiConfigs.map((aiConfig) => (
              <SelectItem key={aiConfig.name} value={aiConfig.name}>{aiConfig.name}</SelectItem>))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={handleOpenOptionPage}>
          <GearIcon className="h-4 w-4" />
        </Button>
      </div>
      <section className="overflow-hidden flex-1 flex flex-col gap-2">
        <div className="overflow-hidden flex-1">
          {messages.length <= 0 ? <div className="h-full flex justify-center items-center">
              <Button variant="ghost" onClick={tigerGenerateSummary} disabled={messages.length > 0 || !activeAi}>😍
                Generate
                summary</Button>
            </div> :
              <MessageList messages={messages}></MessageList>
          }
        </div>
        <div className="flex gap-4 p-3">
          <Input disabled={isPending} className="flex-1" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}></Input>
          <Button disabled={isPending} onClick={handleSendMessage}>Send</Button>
        </div>
      </section>
    </main>
  )
}

export default SidePanel
