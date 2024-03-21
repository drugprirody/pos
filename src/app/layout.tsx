import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";

import "@/shared/styles/globals.scss";

import { NavigationStoreProvider } from "@/app/providers/navigation-store";

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
    <html lang="ru" className="dark">
      <body className={roboto.className}>
        <div className="mt-16 box-border flex h-[100vh-64px] w-full">
          <NavigationStoreProvider>
            <Header />
            <Sidebar />
          </NavigationStoreProvider>

          <main className="w-full flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
