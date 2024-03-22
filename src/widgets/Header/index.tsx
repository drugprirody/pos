"use client";
import { FC } from "react";

import Languages from "@/components/header/Languages";

import { Menu, Moon } from "lucide-react";

interface Props {}

const Index: FC<Props> = () => {
  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center bg-bg-2 px-4 py-3 shadow-md dark:bg-text-1">
      <button type="button">
        <Menu />
      </button>
      <div style={{ lineHeight: 0 }} className="flex flex-1 justify-end gap-6">
        <button type="button">
          <Moon />
        </button>
        <Languages />
      </div>
    </div>
  );
};
export default Index;
