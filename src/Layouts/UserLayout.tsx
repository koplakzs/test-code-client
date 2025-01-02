import SidebarUser from "@/components/SidebarUser";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <SidebarProvider>
      <SidebarUser />
      <main className="p-5 w-full">
        <SidebarTrigger className="pb-5" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
