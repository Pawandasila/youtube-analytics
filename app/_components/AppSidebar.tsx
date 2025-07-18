"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import {
  Home,
  ImageIcon,
  Monitor,
  Hash,
  BarChart3,
  Target,
  Lightbulb,
  CreditCard,
  User,
  TrendingUp,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
];

const aiToolsItems = [
  {
    title: "Thumbnail Generator",
    url: "/thumbnail-generator",
    icon: ImageIcon,
  },
  {
    title: "Thumbnail Search",
    url: "/thumbnail-search",
    icon: Monitor,
  },
  // {
  //   title: "Keywords",
  //   url: "/keywords",
  //   icon: Hash,
  // },
  // {
  //   title: "Optimize",
  //   url: "/optimize",
  //   icon: BarChart3,
  // },
  {
    title: "Outlier",
    url: "/outlier",
    icon: Target,
  },
  {
    title: "AI Content Generator",
    url: "/ai-content-generator",
    icon: Lightbulb,
  },
];

const accountItems = [
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating" className="border-sidebar-border/50">
      <SidebarHeader>
        <div className="flex items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            className="mr-3 transition-all duration-200 runded"
          />
          {open && (
            <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent transition-all duration-300">
              TrendTide
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-2 py-1 text-xs font-medium">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                        {
                          "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm":
                            pathname === item.url,
                        },
                      )}
                    >
                      <item.icon
                        className={cn("size-5", {
                          "text-sidebar-primary-foreground":
                            pathname === item.url,
                          "text-sidebar-foreground/70": pathname !== item.url,
                        })}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-2 py-1 text-xs font-medium">
            AI Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiToolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                        {
                          "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm":
                            pathname === item.url,
                        },
                      )}
                    >
                      <item.icon
                        className={cn("size-5", {
                          "text-sidebar-primary-foreground":
                            pathname === item.url,
                          "text-sidebar-foreground/70": pathname !== item.url,
                        })}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-2 py-1 text-xs font-medium">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                        {
                          "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm":
                            pathname === item.url,
                        },
                      )}
                    >
                      <item.icon
                        className={cn("size-5", {
                          "text-sidebar-primary-foreground":
                            pathname === item.url,
                          "text-sidebar-foreground/70": pathname !== item.url,
                        })}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}