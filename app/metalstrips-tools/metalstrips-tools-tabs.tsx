"use client";

import { ToolsTab } from "@/app/metalstrips-tools/tabs/machines-tab";
import { MetalstripsTab } from "@/app/metalstrips-tools/tabs/metalstrips-tab";
import { OverviewTab } from "@/app/metalstrips-tools/tabs/overview-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type TabValue = "overview" | "metalstrips" | "machines";

export function MetalstripsToolsTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metalstrips">Metalstrips</TabsTrigger>
        <TabsTrigger value="machines">Tools</TabsTrigger>
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
