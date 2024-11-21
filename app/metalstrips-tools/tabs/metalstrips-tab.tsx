import { CreateDataDialog } from "@/app/metalstrips-tools/create-data-dialog";
import { MetalstripsToolsTable } from "@/app/metalstrips-tools/metalstrips-tools-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetalstripsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Metalstrips</CardTitle>
          <CreateDataDialog
            type="metalstrips"
            title="Add New Metalstrip"
            description="Add a new product to the master data."
          />
        </div>
        <CardDescription>A list of all metalstrips.</CardDescription>
      </CardHeader>
      <CardContent>
        <MetalstripsToolsTable type="metalstrips" />
      </CardContent>
    </Card>
  );
}
