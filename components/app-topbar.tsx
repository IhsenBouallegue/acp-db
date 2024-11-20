import GlobalSearch from "@/components/app-global-search";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar({ breadcrumb }: { breadcrumb: React.ReactNode }) {
  return (
    <header className="relative flex h-16 shrink-0 items-center gap-2 border-b bg-primary text-primary-foreground">
      <div className="absolute z-20 pl-4 md:pl-6 flex items-center">
        <SidebarTrigger className="-ml-1" />
        <div className="hidden md:flex items-center">
          <Separator orientation="vertical" className="mx-2 h-4" />
          {breadcrumb}
        </div>
      </div>
      <div className="absolute z-10 w-full flex-1 flex justify-end md:justify-center">
        <GlobalSearch />
      </div>
    </header>
  );
}
