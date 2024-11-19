"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/master-data";
import { machines } from "@/data/master-data";

export function MasterDataOverview() {
  // This will be replaced with a server action to fetch the actual counts
  const productsCount = products.length;
  const machinesCount = machines.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Master Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{productsCount + machinesCount}</div>
        <p className="text-xs text-muted-foreground">
          {productsCount} Articles, {machinesCount} Machines
        </p>
      </CardContent>
    </Card>
  );
}
