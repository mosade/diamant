import { Message } from '@/type'
import { MessageItem } from '@/sidepanel/component/MessageItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'

export function MessageList(props: { messages: Message[] }) {
  const { messages } = props
  const displayedMessages = messages.filter((message) => message.character !== 'placeholder')
  //1判断是否在底部/没有滚动条
  //2.如果是当MessageItem变化的时候也需要保持滚到底部这个行为
  const messageListRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)

  /**
   * 判断是否在底部，如果不在底部则滚动到底部\
   * TODO 只是在生成内容的时候触发滚动
   */
  function isInBottomInRange() {
    const scrollHeight = scrollContentRef.current?.scrollHeight ?? 0
    const scrollTop = scrollContentRef.current?.scrollTop ?? 0
    const clientHeight = scrollContentRef.current?.clientHeight ?? 0
    console.log(scrollHeight - scrollTop - clientHeight);
    if (scrollHeight - scrollTop - clientHeight <= 50) {
      messageListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  isInBottomInRange()

  return <ScrollArea ref={scrollContentRef} className="h-full w-full rounded-md border p-4">
    <div className="flex flex-col gap-4" ref={messageListRef}>
      {displayedMessages.map((message, index) =>
        (<MessageItem message={message} key={index}></MessageItem>
        ))
      }
    </div>
  </ScrollArea>

}
