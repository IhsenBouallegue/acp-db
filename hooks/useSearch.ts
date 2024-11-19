import { categoryConfigs } from "@/config/search-config";
import { mockDatabase } from "@/data/search-data";
import type { SearchResult } from "@/types/search.types";
import { useCallback, useMemo, useState } from "react";

export function useSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filterResults = useCallback((value: string): SearchResult[] => {
    if (!value) return mockDatabase;

    if (value === "@" || (value.startsWith("@") && !value.includes(" "))) {
      const categoryQuery = value.slice(1).toLowerCase();
      return categoryConfigs
        .filter(({ id }) => id.startsWith(categoryQuery))
        .map(({ id, label }) => ({
          id,
          name: `Search ${label.toLowerCase()}`,
          category: "all",
        }));
    }

    if (value.startsWith("@")) {
      const [fullCategory, ...searchTerms] = value.slice(1).split(" ");
      const searchTerm = searchTerms.join(" ").toLowerCase();

      return mockDatabase.filter(
        (item) => item.category === fullCategory && (!searchTerm || item.name.toLowerCase().startsWith(searchTerm)),
      );
    }

    return mockDatabase.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  }, []);

  const results = useMemo(() => filterResults(query), [query, filterResults]);

  const handleSelect = useCallback((selectedItem: string) => {
    if (selectedItem.startsWith("Search ")) {
      setQuery(`@${selectedItem.slice(7).toLowerCase()} `);
    } else {
      setQuery(selectedItem);
      setOpen(false);
    }
  }, []);

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    handleSelect,
  };
}
