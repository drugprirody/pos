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
        <div className=" w-full">
          <Header />
        </div>
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <main className="flex-1">

            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
