import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import localFont from "next/font/local";
import "./globals.css";

const Yekan = localFont({
  src: "./fonts/yekan/YekanBakh.woff2",
});

export const metadata: Metadata = {
  title: "تسکوگیم",
  description: "مدیریت بلاگ های تسکوگیم و سیستم رنک بندی نویسندگان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${Yekan.className} ${Yekan.style}`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
