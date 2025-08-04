import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Navbar } from "./_components/navbar";

import { AppSidebar } from "./_components/sidebar";

export default async function GeneralLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-dvh flex-col">
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
