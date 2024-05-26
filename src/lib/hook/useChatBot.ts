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
      setMessages((preMessages) => [...preMessages, { character: 'ai', content: '' }])
      await chatBot.current.chat(message, (response) => {
        setMessages((preMessages) => {
          const newMessages = [...preMessages]
          newMessages[newMessages.length - 1].content += response
          return newMessages
        })
      })

    }
  }
  return {
    messages, setMessages, chat,
  }
}
