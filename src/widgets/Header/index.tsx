"use client";
import { FC } from "react";

//jotai
import { useAtom } from "jotai";
import atoms from "@/app/_providers/jotai";

import { Menu, Moon } from "lucide-react";

interface Props {}

const Index: FC<Props> = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(atoms.isSidebarOpen)

  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center bg-gray-50 px-4 py-3 border-text- dark:bg-text-1 border-b border-gray-1 dark:border-gray-1/10">
      <button type="button" onClick={handleSidebar}>
        <Menu />
      </button>
      <div style={{ lineHeight: 0 }} className="flex flex-1 justify-end gap-6">
        <button type="button" onClick={handleDarkMode}>
          <Moon />
        </button>
      </div>
    </div>
  );
};
export default Index;
