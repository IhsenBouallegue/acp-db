"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { machines, manufacturingSites, products } from "@/data/master-data";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export function MasterDataTable({ type }: { type: "products" | "machines" }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const columns: ColumnDef<any>[] =
    type === "products"
      ? [
          { accessorKey: "width", header: "Width" },
          { accessorKey: "thickness", header: "Thickness" },
          { accessorKey: "elongation", header: "Elongation" },
          { accessorKey: "symmetry", header: "Symmetry" },
          { accessorKey: "designNumber", header: "Design Number" },
          { accessorKey: "manufacturingSite", header: "Manufacturing Site" },
        ]
      : [
          { accessorKey: "web", header: "Web" },
          { accessorKey: "notch", header: "Notch" },
          { accessorKey: "louverWidth", header: "Louver Width" },
          { accessorKey: "designNumber", header: "Design Number" },
          { accessorKey: "machineSetNumber", header: "Machine Set Number" },
          { accessorKey: "manufacturingSite", header: "Manufacturing Site" },
        ];

  const data = type === "products" ? products : machines;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${type}...`}
          value={(table.getColumn("designNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("designNumber")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={(value) => table.getColumn("manufacturingSite")?.setFilterValue(value)}>
          <SelectTrigger className="w-[180px] ml-2">
            <SelectValue placeholder="Select site" />
          </SelectTrigger>
          <SelectContent>
            {manufacturingSites.map((site) => (
              <SelectItem key={site} value={site}>
                {site}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
