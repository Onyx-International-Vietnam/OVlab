// app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Boxes,
  Users,
  FileText,
  MailPlus,
} from "lucide-react";

type NavItem = {
  href: Route;           // <-- quan trọng: dùng Route thay vì string
  label: string;
  icon: LucideIcon;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Admin header (no site Topbar) */}
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
          <div className="flex h-12 items-center gap-3 px-4">
            <SidebarTrigger />
            <div className="text-sm font-semibold tracking-wide">OVLAB Admin</div>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const pathname = usePathname();

  const nav: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/rooms", label: "Rooms", icon: Boxes },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/admin/invitations", label: "Invitations", icon: MailPlus },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-2">
          <Link href={"/admin" as Route} className="block text-base font-bold tracking-wide">
            O V L A B
          </Link>
          <div className="text-xs text-slate-500">Administration</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active} aria-current={active ? "page" : undefined}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator />
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Admin</div>
            <div className="truncate text-xs text-slate-500">admin@ovlab.io</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
