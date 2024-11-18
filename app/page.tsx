import { IdeaExchangeOverview } from "@/components/overview-ideas-exchange";
import { KnowledgeBaseOverview } from "@/components/overview-knowledge-base";
import { MasterDataOverview } from "@/components/overview-master";
import { QuickActions } from "@/components/overview-quick-actions";
import { RecentActivity } from "@/components/overview-recent-activity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<Card className="h-[125px] animate-pulse" />}>
              <MasterDataOverview />
            </Suspense>
            <Suspense fallback={<Card className="h-[125px] animate-pulse" />}>
              <KnowledgeBaseOverview />
            </Suspense>
            <Suspense fallback={<Card className="h-[125px] animate-pulse" />}>
              <IdeaExchangeOverview />
            </Suspense>
            <QuickActions />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
                <CardDescription>Latest additions to the Knowledge Base</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading recent articles...</div>}>
                  {/* This will be replaced with a server component for fetching recent articles */}
                  <p>List of recent articles will appear here</p>
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Popular Ideas</CardTitle>
                <CardDescription>Top ideas from the Idea Exchange</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading popular ideas...</div>}>
                  {/* This will be replaced with a client component using React Query for fetching popular ideas */}
                  <p>List of popular ideas will appear here</p>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <RecentActivity />
        </TabsContent>
      </Tabs>
    </div>
  );
}
