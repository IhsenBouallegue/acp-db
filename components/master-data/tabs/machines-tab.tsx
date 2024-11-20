import { MasterDataDialog } from "@/app/master-data/master-data-dialog";
import { MasterDataTable } from "@/app/master-data/master-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MachinesTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Machines</CardTitle>
          <MasterDataDialog
            type="machines"
            title="Add New Machine"
            description="Add a new machine to the master data."
          />
        </div>
        <CardDescription>A list of all machines.</CardDescription>
      </CardHeader>
      <CardContent>
        <MasterDataTable type="machines" />
      </CardContent>
    </Card>
  );
}
