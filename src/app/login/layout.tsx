import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/shared/styles/globals.scss";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <main className="w-full flex-1">{children}</main>
      </body>
    </html>
  );
}
