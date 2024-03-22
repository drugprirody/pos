"use client";
import { FC } from "react";

import { useNavigationStore } from "@/app/_providers/navigation-store";
import Languages from '@/components/header/Languages'
import { Menu, Moon } from "lucide-react";
interface Props {}

const Index: FC<Props> = () => {
  const { toggleSidebar, toggleDark } = useNavigationStore((state) => state);


  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center bg-bg-2 px-4 py-3 shadow-md dark:bg-text-1">
      <button type="button" onClick={toggleSidebar}>
        <Menu />
      </button>
      <div style={{ lineHeight: 0 }} className="flex flex-1 justify-end gap-6">
        <button type="button" onClick={toggleDark}>
          <Moon />
        </button>
        <Languages />
      </div>
    </div>
  );
};
export default Index;
