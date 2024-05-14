import { Provider } from "jotai";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

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
      <html lang="ru" className="dark">
        <body className={roboto.className}>
          <main className="w-full flex-1">{children}</main>
        </body>
      </html>
    </Provider>

  );
}
