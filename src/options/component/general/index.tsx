import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { DeepSeekConfig } from '@/options/component/general/DeepSeek'

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
        return <DeepSeekConfig></DeepSeekConfig>
      },
    },
  ]
  return (
    <div  className="container pt-10">
      <Tabs defaultValue={tabs[0].title} orientation="vertical" className=" grid grid-cols-[200px_1fr] gap-2">
        <TabsList className="flex flex-col justify-start  h-fit">
          {tabs.map(({ title }) => <TabsTrigger key={title} value={title}>{title}</TabsTrigger>)}
        </TabsList>
        {tabs.map(tab => <TabsContent key={tab.title} value={tab.title}>
          {tab.render()}
        </TabsContent>)}
      </Tabs>
    </div>
  )
}
