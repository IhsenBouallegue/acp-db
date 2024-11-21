"use client";

import { MetalstripToolBarChart } from "@/app/metalstrips-tools/product-tool-bar-chart";
import { MetalstripTypePieChart } from "@/app/metalstrips-tools/product-type-pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DataCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Metalstrips and Tools by Country</CardTitle>
          <CardDescription>Distribution of metalstrips and tools across different manufacturing sites</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <MetalstripToolBarChart />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Metalstrip Type Distribution</CardTitle>
          <CardDescription>Breakdown of product types in the inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <MetalstripTypePieChart />
        </CardContent>
      </Card>
    </div>
  );
}
