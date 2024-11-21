"use client";

import { Logo } from "@/components/logo";
import { NavMain } from "@/components/nav-main";
import { NavQuickLinks } from "@/components/nav-quick-links";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Bookmark,
  Clock,
  Database,
  Factory,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Home,
  LifeBuoy,
  Lightbulb,
  MessageSquare,
  Pin,
  Send,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type * as React from "react";

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@acp-group.net",
    avatar: "/avatars/avatar.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Production",
      url: "/production",
      icon: Factory,
    },
    {
      title: "Metalstrips and Tools",
      url: "/metalstrips-tools",
      icon: Wrench,
    },
    {
      title: "Downtime Definitions",
      url: "/downtime-definitions",
      icon: Clock,
    },
    {
      title: "Material Specs",
      url: "/material-specs",
      icon: FileSpreadsheet,
    },
    {
      title: "Knowledge Base",
      url: "/knowledge-base",
      icon: BookOpen,
      isActive: true,

      items: [
        {
          title: "Setup Guideline",
          url: "/knowledge-base/setup-guideline",
          icon: FileText,
        },
        {
          title: "Troubleshoot",
          url: "/knowledge-base/troubleshoot",
          icon: HelpCircle,
        },
      ],
    },
    {
      title: "Idea Exchange",
      url: "/idea-exchange",
      icon: MessageSquare,
    },
    {
      title: "User Management",
      url: "/user-management",
      icon: Users,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  quickLinks: [
    {
      title: "Bookmarked Articles",
      url: "/knowledge-base/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Pinned Posts",
      url: "/idea-exchange/pinned",
      icon: Pin,
    },
    {
      title: "Recent Documents",
      url: "/documents/recent",
      icon: FileText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavQuickLinks items={data.quickLinks} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
