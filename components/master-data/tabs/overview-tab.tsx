import { ProductTypePieChart } from "@/app/master-data/product-type-pie-chart";

import { ProductToolBarChart } from "@/app/master-data/product-tool-bar-chart";

export function OverviewTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ProductToolBarChart />
      <ProductTypePieChart />
    </div>
  );
}
