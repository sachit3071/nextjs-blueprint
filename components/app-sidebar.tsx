"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import { User, BarChart3, LogOut, Sun, Moon } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
];

export function AppSidebar() {
  const [profile, setProfile] = useState<{ firstName: string; lastName: string; email: string } | null>(null)
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setProfile({
          firstName: user.user_metadata?.first_name ?? "",
          lastName: user.user_metadata?.last_name ?? "",
          email: user.email ?? "",
        })
      }
    }
    getUser()
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User />
              <span>{profile?.email}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="top">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{profile?.firstName} {profile?.lastName}</span>
                <span className="text-xs text-muted-foreground font-normal">{profile?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
                {resolvedTheme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
