"use client";

import { MachinesTab } from "@/components/master-data/tabs/machines-tab";
import { OverviewTab } from "@/components/master-data/tabs/overview-tab";
import { ProductsTab } from "@/components/master-data/tabs/products-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type TabValue = "overview" | "products" | "machines";

export function MasterDataTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="machines">Machines</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="products">
        <ProductsTab />
      </TabsContent>

      <TabsContent value="machines">
        <MachinesTab />
      </TabsContent>
    </Tabs>
  );
}
