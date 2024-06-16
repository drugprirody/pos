import { Provider } from "jotai";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";

import "@/shared/styles/globals.scss";

const roboto = Roboto({ subsets: ["cyrillic"], weight: "400" });

export const metadata: Metadata = {
  title: "dashboard shad-cn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="ru" >
        <body className={roboto.className}>
          <div className="mt-16 box-border flex h-[100vh-64px] w-full">
            <Header />
            <Sidebar />
            <main className="w-full flex-1">{children}</main>
          </div>
        </body>
      </html>
    </Provider>

  );
}
