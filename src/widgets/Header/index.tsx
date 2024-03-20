'use client'
import { FC } from 'react';

import { useNavigationStore } from '@/providers/zustand/navigation-store';

import { Languages, Menu, Moon } from 'lucide-react';
interface Props { };

const Index: FC<Props> = () => {
  const { toggleSidebar, toggleDark } = useNavigationStore((state) => state)
  return (
    <div className="fixed top-0 w-full z-20 shadow-md h-16 bg-bg-2 px-4 py-3 flex items-center dark: dark:bg-text-1">
      <button type="button" onClick={toggleSidebar}>
        <Menu />
      </button>
      <div style={{ lineHeight: 0 }} className='flex flex-1 justify-end gap-6'>
        <button type="button" onClick={toggleDark}>
          <Moon />
        </button>
        <button type="button" className='group relative '>
          <Languages />
          <div className='absolute box-border top-4 right-0 w-32 bg-bg-1 py-2 dark:bg-text-2 rounded-sm'>
            <ul className='flex flex-col'>

              {/* fix tailwind plugin */}
              <li className='w-full px-3  h-8 '>Lorem, ipsum.</li>
              <li className='w-full px-3 py-2 h-8'>Lorem, ipsum.</li>
            </ul>
          </div>
        </button>
      </div>
    </div >)
};
export default Index