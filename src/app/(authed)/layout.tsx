import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<Sidebar></Sidebar>}>
        <AppSidebar />
      </Suspense>
      <main className="px-8 py-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
