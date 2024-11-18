"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MasterDataOverview() {
  // This will be replaced with a server action to fetch the actual counts
  const articleCount = 150;
  const toolCount = 75;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Master Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{articleCount + toolCount}</div>
        <p className="text-xs text-muted-foreground">
          {articleCount} Articles, {toolCount} Tools
        </p>
      </CardContent>
    </Card>
  );
}
