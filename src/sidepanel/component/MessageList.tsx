import { Message } from '@/type'
import { MessageItem } from '@/sidepanel/component/MessageItem'

export function MessageList(props: { messages: Message[] }) {
  const { messages } = props
  const displayedMessages = messages.filter((message) => message.character !== 'placeholder')
  return <div className="flex flex-col gap-4">
    {displayedMessages.map((message, index) =>
      (<MessageItem message={message} key={index}></MessageItem>
      ))
    }
  </div>
}
