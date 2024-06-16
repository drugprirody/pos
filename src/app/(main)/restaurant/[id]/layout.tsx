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
    <div className='mx-auto w-full bg-secondary-light h-[calc(100vh-64px)]'>
      <Tabs className="w-full" defaultValue={isInfoTab} onChange={(e) => console.log(e.target)}>
        <div className='h-36 border-b border-card-dark/5'>
          <h1 className='mx-8 text-3xl inline-block mt-4 font-bold'>Информация о заведении</h1>
          <div className='pb-4 mt-4 pl-8  '>
            <TabsList className="min-w-64 w-full h-12 justify-start rounded-none space-x-4">
          {TABS.map(({ title, value }) => (
            <TabsTrigger key={value} onClick={() => onTabChange(value)} value={value} className='px-4 h-12 text-base'>{title}</TabsTrigger>
          ))}
        </TabsList>
          </div>
        </div>
        <TabsContent className="mt-0 h-" value="info">{info}</TabsContent>
        <TabsContent className="mt-0" value="dishes">{dishes}</TabsContent>
      </Tabs>

      {/* <div>
        {children}
      </div> */}
    </div>

  )
};