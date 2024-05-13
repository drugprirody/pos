"use client";
import { FC } from "react";

//jotai
import { useAtom } from "jotai";
import atoms from "@/app/_providers/jotai";

import { TvIcon } from "lucide-react";

interface Props {}

const Index: FC<Props> = ({}) => {
  const items = ["item1", "item2", "item3", "item4", "item5"];

  const [isSidebarOpen] = useAtom(atoms.isSidebarOpen)

  return (
    <>
      <aside
        className={`bg-gray-50 dark:bg-text-1 text-gray-700 flex h-[calc(100vh-64px)] flex-col overflow-hidden border-r border-gray-1 dark:border-gray-1/10 fixed top-16  ${isSidebarOpen ? 'translate-x-[0] w-[240px]' : "w-0 translate-x-[-100%]"}`}
      >

      <div className="mb-2 p-4">
        <h5 className="font-sans text-xl font-semibold text-text-2 dark:text-bg-2">
          Sidebar
        </h5>
      </div>
        <nav className="font-sans text-gray-700 space-y-3 p-2 text-base font-normal">
        {items.map((item) => (
          <div
            key={item}
            role="button"
            tabIndex={0}
            className="flex w-full items-center rounded-lg px-3 py-2 leading-tight dark:text-gray-50 hover:bg-text-4 focus:bg-accent"
          >
            <div className="mr-4">
              <TvIcon />
            </div>
            <p className="text-lg">{item}</p>
          </div>
        ))}
      </nav>
      </aside>
      <div className={` ${isSidebarOpen ? "w-[240px]" : 'w-0'} transition`}></div>
    </>
  );
};
export default Index;
