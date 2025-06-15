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
import { ChevronDown, Loader2, MoreHorizontal, Trash, Image as ImageIcon, ExternalLink } from "lucide-react";

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
import { toast } from "sonner";
import { api } from "@/trpc/react";
import Image from "next/image";

interface ImageData {
  id: string;
  url: string;
  contentType: string;
  createdAt: Date;
  userId: string;
}

export const columns: ColumnDef<ImageData>[] = [
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
    id: "preview",
    header: "Preview",
    cell: ({ row }) => (
      <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted">
        <Image
          src={row.original.url}
          alt="Generated image"
          width={64}
          height={64}
          className="h-full w-full rounded-md object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="flex h-full w-full items-center justify-center"><svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
            }
          }}
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "url",
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <code className="max-w-xs truncate rounded bg-muted px-2 py-1 text-xs">
          {row.original.url}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(row.original.url, "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    id: "contentType",
    header: "Type",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.contentType}</div>
    ),
  },
  {
    id: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { mutate: deleteImage, isPending } =
        api.images.deleteImage.useMutation({
          onSuccess: () => {
            toast.success("Image deleted");
          },
          onError: (error) => {
            toast.error("Failed to delete image: " + error.message);
          },
        });

      const image = row.original;

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
              onClick={() => window.open(image.url, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Size
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteImage(image.id)}
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

export function ImagesTable() {
  const {
    data: imagesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = api.images.getUserImages.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const flattenedData = React.useMemo(
    () => imagesData?.pages.flatMap((page) => page.items) ?? [],
    [imagesData],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: flattenedData,
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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Generated Images</h3>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input
            placeholder="Filter by URL..."
            value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("url")?.setFilterValue(event.target.value)
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading images...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No images found.
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              if (hasNextPage && table.getPageCount() === table.getState().pagination.pageIndex + 2) {
                void fetchNextPage();
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}