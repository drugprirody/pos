'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC } from 'react';

interface Props {
  params: {
    id: string
  }
};

const TABS = [
  {
    title: "Информация",
    value: "info"
  },
  {
    title: "Блюда",
    value: "dishes"
  }
]

const Index: FC<Props> = ({ }) => {
  return (
    <div>
      <Tabs defaultValue="info" className="w-[400px]" onChange={(e) => console.log(e.target)}>
        <TabsList >
          {TABS.map(({ title, value }) => (
            <TabsTrigger key={value} value={value}>{title}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="info">Make changes to your account here.</TabsContent>
        <TabsContent value="dishes">Change your password here.</TabsContent>
      </Tabs>
    </div>

  )
};
export default Index