"use client";

import { DataCharts } from "@/app/master-data/app-master-data-components-data-charts";
import { GlobalSearch } from "@/app/master-data/app-master-data-components-global-search";
import { MasterDataForm } from "@/app/master-data/app-master-data-components-master-data-form";
import { MasterDataTable } from "@/app/master-data/app-master-data-components-master-data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState<"products" | "tools" | "dashboard">("products");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formType, setFormType] = useState<"products" | "tools">("products");

  const handleAddClick = (type: "products" | "tools") => {
    setFormType(type);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Here you would typically update your data store or make an API call
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Master Data Management</h1>
      <div className="mb-6">
        <GlobalSearch />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "products" | "tools" | "dashboard")}
        className="mt-6"
      >
        <TabsList className="bg-muted">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="tools"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Tools
          </TabsTrigger>
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">Products</h2>
            <Button
              onClick={() => handleAddClick("products")}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
          <MasterDataTable type="products" />
        </TabsContent>
        <TabsContent value="tools">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">Tools</h2>
            <Button
              onClick={() => handleAddClick("tools")}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tool
            </Button>
          </div>
          <MasterDataTable type="tools" />
        </TabsContent>
        <TabsContent value="dashboard">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Dashboard</h2>
          <DataCharts />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-primary">Add New {formType === "products" ? "Product" : "Tool"}</DialogTitle>
          </DialogHeader>
          <MasterDataForm type={formType} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
