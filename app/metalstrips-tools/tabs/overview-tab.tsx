import { MetalstripToolBarChart } from "@/app/metalstrips-tools/product-tool-bar-chart";
import { MetalstripTypePieChart } from "@/app/metalstrips-tools/product-type-pie-chart";

export function OverviewTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MetalstripToolBarChart />
      <MetalstripTypePieChart />
    </div>
  );
}
