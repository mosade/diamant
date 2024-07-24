import { Message } from '@/type'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import markdownit from 'markdown-it'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import './markdown.css'

export const MessageItem = forwardRef<HTMLDivElement,{ message: Message }>((props, ref) => {
  const { message } = props
  const mdRef = useRef<ReturnType<typeof markdownit> | null>(null)
  if (!mdRef.current) {
    mdRef.current = markdownit()
  }
  const markDownRenderedHtml = useMemo(() => {
    return (mdRef.current?.render(message.content))
  }, [message.content])

  const resolveMessageByStatus = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return <SkeletonLoading></SkeletonLoading>
      case 'success':
        if (!markDownRenderedHtml) return <SkeletonLoading></SkeletonLoading>
        return <div className="text-sm markdown-body" dangerouslySetInnerHTML={{ __html: markDownRenderedHtml }}></div>
      case 'failed':
        return <div className="flex flex-col gap-2">
          {message.error}
        </div>
    }
  }
  return <div
    className={cn('flex gap-2 flex-col md:flex-row', message.character === 'user' ? 'md:flex-row-reverse items-end md:items-start' : '')}>
    <Avatar>
      <AvatarFallback>{message.character}</AvatarFallback>
    </Avatar>
    <Card className="">
      <CardContent>
        {resolveMessageByStatus(message.status)}
      </CardContent>
    </Card>
  </div>
})

export function SkeletonLoading() {
  return <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-[150px]" />
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[300px]" />
  </div>
}
