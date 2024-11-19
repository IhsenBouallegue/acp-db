"use client";

import { ProductToolBarChart } from "@/app/master-data/product-tool-bar-chart";
import { ProductTypePieChart } from "@/app/master-data/product-type-pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DataCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Products and Tools by Country</CardTitle>
          <CardDescription>Distribution of products and tools across different manufacturing sites</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ProductToolBarChart />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Product Type Distribution</CardTitle>
          <CardDescription>Breakdown of product types in the inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTypePieChart />
        </CardContent>
      </Card>
    </div>
  );
}
