import { AIBasisConfig, Message } from '@/type'
import { useEffect, useRef, useState } from 'react'
import { ChatBot } from '@/lib/chatBot'

export function useChatBot(aiInfo?: AIBasisConfig) {
  const [messages, setMessages] = useState<Message[]>([])
  const chatBot = useRef<ChatBot | null>(null)
  useEffect(() => {
      if (aiInfo) {
        chatBot.current = new ChatBot(aiInfo)
      }
    },
    [aiInfo])
  const chat = async (message: Message) => {
    setMessages((preMessages) => {
      return [...preMessages, message]
    })
    if (chatBot.current) {
      try {
        setMessages((preMessages) => [...preMessages, { character: 'ai', content: '', status: 'pending' }])
        await chatBot.current.chat(message, (response) => {
          setMessages((preMessages) => {
            const newMessages = [...preMessages]
            newMessages[newMessages.length - 1].content += response
            newMessages[newMessages.length - 1].status = 'success'
            return newMessages
          })
        })
      } catch (e:any) {
        setMessages((preMessages) => {
          const newMessages = [...preMessages]
          newMessages[newMessages.length - 1].content = ''
          newMessages[newMessages.length - 1].status = 'failed'
          newMessages[newMessages.length - 1].error = 'Something went wrong, please try again'
          return newMessages
        })
      }

    }
  }
  return {
    messages, setMessages, chat,
  }
}
