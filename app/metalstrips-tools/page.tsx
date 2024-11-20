import { MetalstripsToolsTabs } from "@/components/metalstrips-tools/metalstrips-tools-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeading } from "@/components/ui/page-heading";
import { Cog, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metalstrips and Tools",
};

export default function MetalstripsToolsPage() {
  return (
    <PageContainer>
      <PageHeading className="text-3xl font-bold mb-6">Metalstrips and Tools Management</PageHeading>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metalstrips</CardTitle>
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
            <Cog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">955</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <MetalstripsToolsTabs />
    </PageContainer>
  );
} 