"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metalstrips } from "@/data/master-data";
import { machines } from "@/data/master-data";

export function MetalstripsToolsOverview() {
  // This will be replaced with a server action to fetch the actual counts
  const metalstripsCount = metalstrips.length;
  const machinesCount = machines.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metalstrips & Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metalstripsCount + machinesCount}</div>
        <p className="text-xs text-muted-foreground">
          {metalstripsCount} Metalstrips, {machinesCount} Tools
        </p>
      </CardContent>
    </Card>
  );
}
