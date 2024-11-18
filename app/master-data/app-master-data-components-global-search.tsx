"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import * as React from "react";

const searchOptions = [
  {
    value: "product",
    label: "Product",
  },
  {
    value: "tool",
    label: "Tool",
  },
];

export function GlobalSearch() {
  const [search, setSearch] = React.useState({ type: "", query: "" });
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[300px] justify-between">
          <Search className="mr-2 h-4 w-4" />
          {search.type
            ? searchOptions.find((option) => option.value === search.type)?.label
            : "Search products and tools..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search products and tools..."
            value={search.query}
            onValueChange={(query) => setSearch((prev) => ({ ...prev, query }))}
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {searchOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setSearch((prev) => ({ ...prev, type: currentValue === search.type ? "" : currentValue }));
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", search.type === option.value ? "opacity-100" : "opacity-0")} />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
