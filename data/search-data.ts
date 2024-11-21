import { mockPosts } from "@/data/social-data";
import type { SearchResult } from "@/types/search.types";
import { machines, metalstrips } from "./master-data";

export const mockDatabase: SearchResult[] = [
  // Users
  { id: "1", name: "John Doe", category: "users" },
  { id: "2", name: "Jane Smith", category: "users" },
  { id: "3", name: "Alice Johnson", category: "users" },

  // Metalstrips
  ...metalstrips.map((product) => ({
    id: product.id.toString(),
    name: `Metalstrip ${product.designNumber}`,
    category: "metalstrips" as const,
  })),

  // Tools
  ...machines.map((machine) => ({
    id: machine.id.toString(),
    name: `Tool ${machine.designNumber}`,
    category: "machines" as const,
  })),

  // Posts
  ...mockPosts.map((post) => ({
    id: post.id.toString(),
    name: post.content,
    category: "posts" as const,
  })),
];
