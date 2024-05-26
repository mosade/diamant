import { Message } from '@/type'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import markdownit from 'markdown-it'
import { useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MessageItem(props: { message: Message }) {
  const { message } = props
  const mdRef = useRef<ReturnType<typeof markdownit> | null>(null)
  useEffect(() => {
    mdRef.current = markdownit()
  }, [])
  const markDownRenderedHtml = mdRef.current?.render(message.content)
  return <Card>
    <CardTitle>{message.character}</CardTitle>
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
}
