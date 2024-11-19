"use client"

import * as React from "react"
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { type: "Type A", count: 275, fill: "var(--color-type-a)" },
  { type: "Type B", count: 200, fill: "var(--color-type-b)" },
  { type: "Type C", count: 187, fill: "var(--color-type-c)" },
  { type: "Type D", count: 173, fill: "var(--color-type-d)" },
  { type: "Type E", count: 90, fill: "var(--color-type-e)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  type: {
    label: "Type",
  },
  "Type A": {
    label: "Type A",
    color: "hsl(var(--chart-1))",
  },
  "Type B": {
    label: "Type B",
    color: "hsl(var(--chart-2))",
  },
  "Type C": {
    label: "Type C",
    color: "hsl(var(--chart-3))",
  },
  "Type D": {
    label: "Type D",
    color: "hsl(var(--chart-4))",
  },
  "Type E": {
    label: "Type E",
    color: "hsl(var(--chart-5))",
  },
}

export function ProductTypePieChart() {
  const totalItems = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Type Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalItems.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Type A products trending up by 3.7% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of product types
        </div>
      </CardFooter>
    </Card>
  )
}