"use client";
import { FC } from "react";

import { useNavigationStore } from "@/providers/navigation-store";

import { Languages, Menu, Moon } from "lucide-react";
interface Props {}

const Index: FC<Props> = () => {
  const { toggleSidebar, toggleDark } = useNavigationStore((state) => state);

  const langs = ['Русский', "Türkmen"]

  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center bg-bg-2 px-4 py-3 shadow-md dark:bg-text-1">
      <button type="button" onClick={toggleSidebar}>
        <Menu />
      </button>
      <div style={{ lineHeight: 0 }} className="flex flex-1 justify-end gap-6">
        <button type="button" onClick={toggleDark}>
          <Moon />
        </button>
        <button type="button" className="group relative ">
          <Languages />
          <div className=" right-0 top-4 box-border w-32 rounded-sm bg-bg-1 py-2 dark:bg-text-2">
            <ul className="absolute flex flex-col h-full">
              {/* fix tailwind plugin */}
              {langs.map(l => (
                <li key={l} className="h-8 w-full px-3">{l}</li>
              ))}
              <li className="h-8 w-full px-3 py-2">Lorem, ipsum.</li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Index;
