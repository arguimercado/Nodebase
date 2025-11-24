
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppHeader, AppSidebar } from "./_shared/components";

const AppLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AppLayout;
