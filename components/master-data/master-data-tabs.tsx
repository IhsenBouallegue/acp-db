"use client";

import { OverviewTab } from "@/components/master-data/tabs/overview-tab";
import { ProductsTab } from "@/components/master-data/tabs/products-tab";
import { ToolsTab } from "@/components/master-data/tabs/tools-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type TabValue = "overview" | "products" | "tools";

export function MasterDataTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>

      <TabsContent value="tools">
        <ToolsTab />
      </TabsContent>
    </Tabs>
  );
}
