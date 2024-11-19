export type SearchCategory = "all" | "users" | "products" | "machines" | "posts";

export interface SearchResult {
  id: string;
  name: string;
  category: SearchCategory;
}

export interface CategoryConfig {
  id: SearchCategory;
  icon: React.ReactNode;
  label: string;
}
