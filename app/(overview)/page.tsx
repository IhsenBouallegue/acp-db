import { IdeaExchangeOverview } from "@/app/(overview)/overview-ideas-exchange";
import { KnowledgeBaseOverview } from "@/app/(overview)/overview-knowledge-base";
import { MetalstripsToolsOverview } from "@/app/(overview)/overview-metalstrips-tools";
import { QuickActions } from "@/app/(overview)/overview-quick-actions";
import { RecentActivity } from "@/app/(overview)/overview-recent-activity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeading } from "@/components/ui/page-heading";
import { PageSubheading } from "@/components/ui/page-subheading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, LayoutDashboard } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <PageContainer>
      <PageHeading>Dashboard</PageHeading>
      <PageSubheading>View your activity and manage your tools</PageSubheading>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<Card className="h-[125px] animate-pulse" />}>
              <MetalstripsToolsOverview />
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
    </PageContainer>
  );
}
