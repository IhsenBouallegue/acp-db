import { MasterDataDialog } from "@/app/master-data/master-data-dialog";
import { MasterDataTable } from "@/app/master-data/master-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Products</CardTitle>
          <MasterDataDialog
            type="products"
            title="Add New Product"
            description="Add a new product to the master data."
          />
        </div>
        <CardDescription>A list of all products.</CardDescription>
      </CardHeader>
      <CardContent>
        <MasterDataTable type="products" />
      </CardContent>
    </Card>
  );
}
