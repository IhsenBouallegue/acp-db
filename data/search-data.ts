import { mockPosts } from "@/data/social-data";
import type { SearchResult } from "@/types/search.types";
import { machines, products } from "./master-data";

export const mockDatabase: SearchResult[] = [
  // Users
  { id: "1", name: "John Doe", category: "users" },
  { id: "2", name: "Jane Smith", category: "users" },
  { id: "3", name: "Alice Johnson", category: "users" },

  // Products
  ...products.map((product) => ({
    id: product.id.toString(),
    name: `Product ${product.designNumber}`,
    category: "products" as const,
  })),

  // Machines
  ...machines.map((machine) => ({
    id: machine.id.toString(),
    name: `Machine ${machine.designNumber}`,
    category: "machines" as const,
  })),

  // Posts
  ...mockPosts.map((post) => ({
    id: post.id.toString(),
    name: post.content,
    category: "posts" as const,
  })),
];
