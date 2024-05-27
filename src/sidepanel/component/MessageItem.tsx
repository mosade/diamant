import { Message } from '@/type'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import markdownit from 'markdown-it'
import { useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function MessageItem(props: { message: Message }) {
  const { message } = props
  const mdRef = useRef<ReturnType<typeof markdownit> | null>(null)
  useEffect(() => {
    mdRef.current = markdownit()
  }, [])
  const markDownRenderedHtml = mdRef.current?.render(message.content)
  return <div className={cn("flex gap-2 flex-col md:flex-row",message.character==='user'?"md:flex-row-reverse items-end md:items-start":'')}>
    <Avatar>
      <AvatarFallback>{message.character}</AvatarFallback>
    </Avatar>
    <Card className="">
      <CardContent>
        {markDownRenderedHtml ?
          <div dangerouslySetInnerHTML={{ __html: markDownRenderedHtml }}></div>
          :
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>}
      </CardContent>
    </Card>
  </div>
}
