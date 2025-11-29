import type { ReactNode } from "react";
import { AlertDialogProvider } from "@/components/shared/alerts/alert-dialog-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader, AppSidebar } from "./_shared/components";

const AppLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <AlertDialogProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-accent/20">
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AlertDialogProvider>
  );
};
export default AppLayout;
