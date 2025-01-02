import { Home, Inbox, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";

const items = [
  {
    title: "Monitor",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Laporan",
    url: "/admin/report",
    icon: Inbox,
  },
];

export default function SidebarAdmin() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Sidebar className="bg-zinc-800">
      <SidebarHeader>
        <p className="text-center text-lg">Halaman Admin</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button onClick={logout}>
                <LogOut />
                <span>Keluar</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
