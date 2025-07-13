"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import AppHeader from "../_components/AppHeader";
import { AppSidebar } from "../_components/AppSidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "@/components/SearchBar";

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full m-2">
        <div className="flex items-center gap-4 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 mb-4 shadow">
          <SearchBar />
          <div className="ml-auto"><SidebarTrigger /></div>
          <div className="flex items-center gap-3">
            {mounted && (
              <div className="flex items-center">
                <label
                  htmlFor="theme-toggle"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <Sun className="absolute left-1 size-3 text-amber-400" />
                  <input
                    type="checkbox"
                    id="theme-toggle"
                    className="peer sr-only"
                    checked={theme === "dark"}
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                  />
                  <div className="peer h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-7 peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 dark:bg-gray-700"></div>
                  <Moon className="absolute right-1 size-3 text-blue-200" />
                </label>
              </div>
            )}
            <UserButton />
          </div>
        </div>
        
        <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardProvider;
