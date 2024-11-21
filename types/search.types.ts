export type SearchCategory =
  | "all"
  | "users"
  | "metalstrips"
  | "machines"
  | "posts"
  | "knowledge-base"
  | "idea-exchange"
  | "manufacturing";

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
