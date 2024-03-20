import type { Metadata } from "next";
import { Roboto } from "next/font/google";


import Header from '@/widgets/Header'
import Sidebar from '@/widgets/Sidebar'

import "@/shared/styles/globals.scss";

import { NavigationStoreProvider } from '@/providers/zustand/navigation-store'

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
    <html lang="en" >
      <body className={roboto.className}>
        <div className="flex mt-16 box-border h-[100vh-64px] w-full">
          <NavigationStoreProvider>
            <Header />
            <Sidebar />
          </NavigationStoreProvider>
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
