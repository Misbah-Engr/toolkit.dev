import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "./_contexts/theme";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Open Chat",
  description: "Open Chat",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex h-dvh flex-col">
                <Navbar />
                <div className="h-0 flex-1 overflow-hidden">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
