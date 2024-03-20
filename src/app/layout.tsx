import type { Metadata } from "next";

import { Roboto } from "next/font/google";

import Header from '@/widgets/Header'
import Sidebar from '@/widgets/Sidebar'

import "@/shared/styles/globals.scss";

const roboto = Roboto({ subsets: ['cyrillic'], weight: '400' });

export const metadata: Metadata = {
  title: "dashboard shad-cn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex overflow-hidden">
          <Header />
        </div>
        <div className="flex mt-16 box-border h-[100vh-64px] w-full">
          <Sidebar className="flex-1 w-full overflow-auto " />
          <main className="flex-1 w-full h-[100vh-64px]">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
