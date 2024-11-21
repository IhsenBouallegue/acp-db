"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { type: "Type A", count: 275, fill: "hsl(var(--chart-1))" },
  { type: "Type B", count: 200, fill: "hsl(var(--chart-2))" },
  { type: "Type C", count: 187, fill: "hsl(var(--chart-3))" },
  { type: "Type D", count: 173, fill: "hsl(var(--chart-4))" },
  { type: "Type E", count: 90, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  type: {
    label: "Type",
  },
};

export function MetalstripTypePieChart() {
  const totalItems = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Metalstrip Type Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="type" innerRadius={60} strokeWidth={5} fill="#8884d8">
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.fill}-${entry.count}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalItems.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Metalstrips
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Type A metalstrips trending up by 3.7% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing distribution of product types</div>
      </CardFooter>
    </Card>
  );
}
