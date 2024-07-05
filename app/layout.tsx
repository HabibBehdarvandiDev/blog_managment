import { ToastProvider } from "@/context/ToastContext";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ToastContainer from "./components/ToastContainer";
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
    <html lang="fa" dir="rtl">
      <body className={`${Yekan.className}`}>
        <NextUIProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
