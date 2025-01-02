import SidebarAdmin from "@/components/SidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <main className="p-5 w-full">
        <SidebarTrigger className="pb-5" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
