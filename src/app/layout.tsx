import type { Metadata } from "next";
import { Noto_Sans_JP, Mona_Sans } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "W-Skills",
  description: "W-PCP Skills Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${monaSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
