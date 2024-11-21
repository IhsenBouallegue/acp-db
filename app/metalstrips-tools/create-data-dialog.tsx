"use client";

import { MetalstripsToolsForm } from "@/app/metalstrips-tools/metalstrips-tools-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface CreateDataDialogProps {
  type: "metalstrips" | "machines";
  title: string;
  description: string;
}

export function CreateDataDialog({ type, title, description }: CreateDataDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleSubmit = (data: any) => {
    // Here you would typically make an API call to save the data
    console.log("Submitting data:", data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add {type === "metalstrips" ? "Metalstrip" : "Tool"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <MetalstripsToolsForm type={type} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
