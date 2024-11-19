import { MasterDataTable } from "@/app/master-data/master-data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export function ToolsTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tools</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Tool
          </Button>
        </div>
        <CardDescription>A list of all tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <MasterDataTable type="tools" />
      </CardContent>
    </Card>
  );
}
