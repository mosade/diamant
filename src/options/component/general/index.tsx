import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

export function General() {
  const tabs = [
    {
      title: 'General',
      render: () => {
        return 'General'
      },
    },
    {
      title: 'OpenAI',
      render: () => {
        return 'OpenAI'
      },
    },
    {
      title: 'DeepSeek',
      render: () => {
        return 'DeepSeek'
      },
    },
  ]
  return (
    <div defaultValue="General" className="container pt-10">
      <Tabs orientation="vertical" className=" grid grid-cols-[200px_1fr] h-fit gap-2">
        <TabsList className="flex flex-col justify-start">
          {tabs.map(({ title }) => <TabsTrigger key={title} value={title}>{title}</TabsTrigger>)}
        </TabsList>
        {tabs.map(tab => <TabsContent key={tab.title} value={tab.title}>
          {tab.render()}
        </TabsContent>)}
      </Tabs>
    </div>
  )
}
