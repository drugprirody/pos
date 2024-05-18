'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TABS } from '@/data';

interface Props {
  children: React.ReactNode;
  info: React.ReactNode;
  dishes: React.ReactNode;
};

const RESTAURANT_TAB = 'RESTAURANT_TAB'

export default function Layout({ children, info, dishes }: Props) {
  const isInfoTab = sessionStorage && sessionStorage.getItem(RESTAURANT_TAB) || 'info'

  const onTabChange = (val: TabValue) => {
    sessionStorage.setItem(RESTAURANT_TAB, val)
  }
  return (
    <div className='mx-auto w-full'>
      <Tabs defaultValue={isInfoTab} className="w-[400px]" onChange={(e) => console.log(e.target)}>
        <TabsList>
          {TABS.map(({ title, value }) => (
            <TabsTrigger key={value} onClick={() => onTabChange(value)} value={value}>{title}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="info">{info}</TabsContent>
        <TabsContent value="dishes">{dishes}</TabsContent>
      </Tabs>

      <main>
        {children}
      </main>
    </div>

  )
};