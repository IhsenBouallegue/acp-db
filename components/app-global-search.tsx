"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { categoryConfigs, defaultIcon } from "@/config/search-config";
import { useSearch } from "@/hooks/useSearch";
import type { SearchCategory } from "@/types/search.types";
import { Search } from "lucide-react";

export default function GlobalSearch() {
  const { open, setOpen, query, setQuery, results, handleSelect } = useSearch();

  const getCategoryIcon = (category: SearchCategory) => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.icon || defaultIcon;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search ACP DB...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 top-[5%] translate-y-0">
        <DialogHeader className="px-4 py-2">
          <DialogTitle>Search ACP DB</DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or use @users, @products, @machines, @posts..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[400px] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup>
                {results.map((result) => (
                  <CommandItem key={result.id} onSelect={() => handleSelect(result.name)}>
                    {getCategoryIcon(result.category)}
                    <span>{result.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
