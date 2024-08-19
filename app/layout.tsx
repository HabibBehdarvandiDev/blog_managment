import { ToastProvider } from "@/context/ToastContext";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ToastContainer from "../components/toast/ToastContainer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
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
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
