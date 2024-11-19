"use client";

import GlobalSearch from "@/components/app-global-search";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar({ breadcrumb }: { breadcrumb: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-10 bg-background px-4 py-4 shadow-sm w-full">
      <div className="flex flex-row items-center w-full gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumb}
        </div>
        <div className="flex items-center justify-center w-full ">
          <GlobalSearch />
        </div>
      </div>
    </div>
  );
}
