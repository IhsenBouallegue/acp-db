"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { country: "USA", metalstrips: 400, machines: 275 },
  { country: "Germany", metalstrips: 300, machines: 200 },
  { country: "China", metalstrips: 200, machines: 187 },
  { country: "Brazil", metalstrips: 278, machines: 173 },
  { country: "France", metalstrips: 189, machines: 120 },
];

const chartConfig = {
  metalstrips: {
    label: "Metalstrips",
    color: "hsl(var(--chart-1))",
  },
  machines: {
    label: "Tools",
    color: "hsl(var(--chart-2))",
  },
  country: {
    label: "Country",
  },
};

export function MetalstripToolBarChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Metalstrips and Tools by Country</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[300px]">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 80,
            }}
          >
            <YAxis dataKey="country" type="category" tickLine={false} tickMargin={10} axisLine={false} />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="metalstrips" fill="var(--color-metalstrips)" radius={5} />
            <Bar dataKey="machines" fill="var(--color-machines)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Metalstrip growth trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing product and machine distribution across countries
        </div>
      </CardFooter>
    </Card>
  );
}
