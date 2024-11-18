"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Lightbulb, PlusCircle } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button className="w-full justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Master Data
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
          Search Knowledge Base
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          Share an Idea
        </Button>
      </CardContent>
    </Card>
  );
}
