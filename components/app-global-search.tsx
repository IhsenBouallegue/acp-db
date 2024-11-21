"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { categoryConfigs, defaultIcon } from "@/config/search-config";
import { machines, metalstrips } from "@/data/master-data";
import { useSearch } from "@/hooks/useSearch";
import { useSocialStore } from "@/store/social-store";
import { useUserStore } from "@/store/user-store";
import type { SearchCategory, SearchResult } from "@/types/search.types";
import { Search } from "lucide-react";
import { useMemo } from "react";

export default function GlobalSearch() {
  const posts = useSocialStore((state) => state.posts);
  const users = useUserStore((state) => state.users);

  const searchData = useMemo(
    (): SearchResult[] => [
      // Users from store
      ...users.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        category: "users" as const,
      })),

      // Metalstrips from master data
      ...metalstrips.map((product) => ({
        id: product.id.toString(),
        name: `Metalstrip ${product.designNumber}`,
        category: "metalstrips" as const,
      })),

      // Tools from master data
      ...machines.map((machine) => ({
        id: machine.id.toString(),
        name: `Tool ${machine.designNumber}`,
        category: "machines" as const,
      })),

      // Posts from social store
      ...posts.map((post) => ({
        id: post.id.toString(),
        name: post.content,
        category: "posts" as const,
      })),
    ],
    [users, posts],
  );

  const { open, setOpen, query, setQuery, results, handleSelect } = useSearch({ searchData });

  const getCategoryIcon = (category: SearchCategory) => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.icon || defaultIcon;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Desktop Search Button*/}
        <Button
          variant="outline"
          className="hidden md:inline-flex w-[300px] text-left font-normal hover:text-white text-muted-foreground "
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search ACP DB...</span>
        </Button>
      </DialogTrigger>
      {/* Mobile Search Button */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-2 top-[5%] translate-y-0">
        <DialogTitle hidden>Search ACP DB</DialogTitle>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or use @users, @metalstrips, @machines, @posts..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[400px] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup>
                {results.map((result) => (
                  <CommandItem key={`${result.category}-${result.name}`} onSelect={() => handleSelect(result.name)}>
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
