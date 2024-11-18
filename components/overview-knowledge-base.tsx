"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KnowledgeBaseOverview() {
  // This will be replaced with a server action to fetch the actual counts
  const articleCount = 250;
  const guidelineCount = 100;
  const troubleshootCount = 150;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{articleCount}</div>
        <p className="text-xs text-muted-foreground">
          {guidelineCount} Guidelines, {troubleshootCount} Troubleshooting
        </p>
      </CardContent>
    </Card>
  );
}
