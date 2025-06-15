"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, Loader2, MoreHorizontal, Trash, Brain } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { api } from "@/trpc/react";

interface Memory {
  id: string;
  memory: string;
  created_at?: string;
  updated_at?: string;
  categories?: string[];
  metadata?: Record<string, unknown>;
}

export const columns: ColumnDef<Memory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ??
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "memory",
    accessorKey: "memory",
    header: "Memory",
    cell: ({ row }) => (
      <div className="max-w-lg truncate text-sm">{row.original.memory}</div>
    ),
  },
  {
    id: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.categories?.map((category) => (
          <Badge key={category} variant="secondary" className="text-xs">
            {category}
          </Badge>
        )) ?? (
          <span className="text-muted-foreground text-xs">No categories</span>
        )}
      </div>
    ),
  },
  {
    id: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.created_at
          ? new Date(row.original.created_at).toLocaleDateString()
          : "Unknown"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutate: deleteMemory, isPending } =
        api.memories.deleteMemory.useMutation({
          onSuccess: () => {
            toast.success("Memory deleted");
          },
          onError: (error) => {
            toast.error("Failed to delete memory: " + error.message);
          },
        });

      const memory = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => deleteMemory(memory.id)}
              disabled={isPending}
              className="text-destructive focus:text-destructive"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function MemoriesTable() {
  const [page, setPage] = React.useState(1);
  const {
    data: memoriesData,
    isLoading,
    refetch,
  } = api.memories.getUserMemories.useQuery({
    limit: 10,
    page,
  });

  const memories = memoriesData?.items ?? [];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: memories,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: -1, // Unknown page count
  });

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (memoriesData?.hasMore) {
      setPage(page + 1);
    }
  };

  // Refresh data when operations complete
  React.useEffect(() => {
    void refetch();
  }, [page, refetch]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Your Memories</h3>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input
            placeholder="Filter memories..."
            value={(table.getColumn("memory")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("memory")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="flex h-24 items-center justify-center gap-2 text-center"
                >
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading memories...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No memories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm">
            Page {page}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!memoriesData?.hasMore}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}