"use client";

import { ToolsTab } from "@/app/metalstrips-tools/tabs/machines-tab";
import { MetalstripsTab } from "@/app/metalstrips-tools/tabs/metalstrips-tab";
import { OverviewTab } from "@/app/metalstrips-tools/tabs/overview-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cog, LayoutDashboard, Package } from "lucide-react";
import { useState } from "react";

type TabValue = "overview" | "metalstrips" | "machines";

export function MetalstripsToolsTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview" className="flex gap-2 items-center">
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="metalstrips" className="flex gap-2 items-center">
          <Package className="h-4 w-4" />
          Metalstrips
        </TabsTrigger>
        <TabsTrigger value="machines" className="flex gap-2 items-center">
          <Cog className="h-4 w-4" />
          Tools
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="metalstrips">
        <MetalstripsTab />
      </TabsContent>

      <TabsContent value="machines">
        <ToolsTab />
      </TabsContent>
    </Tabs>
  );
}
