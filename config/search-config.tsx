import type { CategoryConfig } from "@/types/search.types";
import { Cog, FileText, Package, Search, Users } from "lucide-react";

export const categoryConfigs: CategoryConfig[] = [
  { id: "users", icon: <Users className="mr-2 h-4 w-4" />, label: "Users" },
  { id: "products", icon: <Package className="mr-2 h-4 w-4" />, label: "Products" },
  { id: "machines", icon: <Cog className="mr-2 h-4 w-4" />, label: "Machines" },
  { id: "posts", icon: <FileText className="mr-2 h-4 w-4" />, label: "Posts" },
];

export const defaultIcon = <Search className="mr-2 h-4 w-4" />;
