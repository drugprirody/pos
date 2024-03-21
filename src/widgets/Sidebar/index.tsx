"use client";
import { FC } from "react";

import { useNavigationStore } from "@/providers/navigation-store";

import { TvIcon } from "lucide-react";
interface Props {}

const Index: FC<Props> = ({}) => {
  const items = ["item1", "item2", "item3", "item4", "item5"];
  const { isSidebarOpen } = useNavigationStore((state) => state);

  return (
    <div
      className={`bg-white text-gray-700 relative flex h-[calc(100vh-64px)] flex-col overflow-hidden rounded-xl bg-clip-border shadow-xl transition-all  ${!isSidebarOpen && "w-0 translate-x-[-100%]"}`}
    >
      <div className="mb-2 p-4">
        <h5 className="font-sans text-xl font-semibold text-text-2 dark:text-bg-2">
          Sidebar
        </h5>
      </div>
      <nav className="font-sans text-gray-700 min-w-[240px] space-y-3 p-2 text-base font-normal">
        {items.map((item) => (
          <div
            key={item}
            role="button"
            tabIndex={0}
            className="flex w-full items-center rounded-lg px-3 py-2 leading-tight transition-all hover:bg-onHover focus:bg-accent"
          >
            <div className="mr-4">
              <TvIcon />
            </div>
            <p className="text-lg">{item}</p>
          </div>
        ))}
      </nav>
    </div>
  );
};
export default Index;
