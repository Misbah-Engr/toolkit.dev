import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/sidebar";
import { ThemeProvider } from "./_contexts/theme";
import { DataProvider } from "./_contexts/data-context";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Toolkit.dev",
  description: "A highly-configurable open-source chat client",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const initialTheme = (themeCookie?.value as "light" | "dark") || "light";

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${initialTheme === "dark" ? "dark" : ""}`}
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider initialTheme={initialTheme}>
            <DataProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="flex h-dvh flex-col">
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </DataProvider>
          </ThemeProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
