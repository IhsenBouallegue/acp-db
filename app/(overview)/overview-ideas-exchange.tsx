"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IdeaExchangeOverview() {
  // This will be replaced with a server action to fetch the actual counts
  const ideaCount = 75;
  const commentCount = 320;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idea Exchange</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{ideaCount}</div>
        <p className="text-xs text-muted-foreground">
          {ideaCount} Ideas, {commentCount} Comments
        </p>
      </CardContent>
    </Card>
  );
}
