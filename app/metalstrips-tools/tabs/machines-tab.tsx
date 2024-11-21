import { CreateDataDialog } from "@/app/metalstrips-tools/create-data-dialog";
import { MetalstripsToolsTable } from "@/app/metalstrips-tools/metalstrips-tools-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ToolsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tools</CardTitle>
          <CreateDataDialog type="machines" title="Add New Tool" description="Add a new machine to the master data." />
        </div>
        <CardDescription>A list of all machines.</CardDescription>
      </CardHeader>
      <CardContent>
        <MetalstripsToolsTable type="machines" />
      </CardContent>
    </Card>
  );
}
