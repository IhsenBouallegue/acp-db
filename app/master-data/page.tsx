"use client";

import { GlobalSearch } from "@/app/master-data/app-master-data-components-global-search";
import { MasterDataTable } from "@/app/master-data/app-master-data-components-master-data-table";
import { ProductToolBarChart } from "@/app/master-data/app-master-data-components-product-tool-bar-chart";
import { ProductTypePieChart } from "@/app/master-data/app-master-data-components-product-type-pie-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, PlusCircle, PenToolIcon as Tool, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "tools">("overview");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Master Data Management</h1>

      <div className="mb-6">
        <GlobalSearch />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,925</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">955</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "overview" | "products" | "tools")}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ProductToolBarChart />
            <ProductTypePieChart />
          </div>
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Products</CardTitle>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              <CardDescription>A list of all products.</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable type="products" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Tools</CardTitle>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tool
                </Button>
              </div>
              <CardDescription>A list of all tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <MasterDataTable type="tools" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
