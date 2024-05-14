"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//jotai
import { useAtom } from "jotai";
import atoms from "@/app/_providers/jotai";

import { NAV_ITEMS } from "@/data";

interface Props {}

const Index: FC<Props> = ({}) => {
  const pathname = usePathname()
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
          {NAV_ITEMS.map(({ Icon, title, url }) => (
            <Link
              key={title}
              href={url}
              role="button"
              className={`flex w-full items-center rounded-lg px-3 py-2 leading-tight dark:text-gray-50 dark:hover:bg-gray-700 hover:bg-gray-300 ${url === pathname && 'bg-slate-300 dark:bg-slate-600 hover:!bg-slate-300 hover:dark:!bg-slate-600'}`}
          >
            <div className="mr-4">
                <Icon />
            </div>
              <p className="text-lg">{title}</p>
            </Link>
        ))}
      </nav>
      </aside>
      <div className={` ${isSidebarOpen ? "w-[240px]" : 'w-0'} transition`}></div>
    </>
  );
};
export default Index;
