import { MasterDataTable } from "@/app/master-data/master-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export function ProductsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Products</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        <CardDescription>A list of all products.</CardDescription>
      </CardHeader>
      <CardContent>
        <MasterDataTable type="products" />
      </CardContent>
    </Card>
  );
}
