"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface DGridProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: PaginationInfo
  loading?: boolean
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  onPageChange?: (page: number) => void
  onNextPage?: () => void
  onPrevPage?: () => void
  className?: string
  emptyMessage?: string
  loadingRows?: number
  enableSorting?: boolean
  manualSorting?: boolean
  manualPagination?: boolean
}

function DGrid<T extends Record<string, any>>({
  data,
  columns,
  pagination,
  loading = false,
  sorting = [],
  onSortingChange,
  onPageChange,
  onNextPage,
  onPrevPage,
  className,
  emptyMessage = "No data available",
  loadingRows = 5,
  enableSorting = true,
  manualSorting = true,
  manualPagination = true,
}: DGridProps<T>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(sorting)

  const table = useReactTable({
    data: loading ? [] : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting,
    manualSorting,
    manualPagination,
    state: {
      sorting: onSortingChange ? sorting : internalSorting,
    },
    onSortingChange: onSortingChange || setInternalSorting,
  })

  const getSortIcon = (isSorted: false | "asc" | "desc") => {
    if (isSorted === "asc") {
      return <ArrowUpIcon className="ml-2 size-4" />
    }
    if (isSorted === "desc") {
      return <ArrowDownIcon className="ml-2 size-4" />
    }
    return <ArrowUpDownIcon className="ml-2 size-4 opacity-50" />
  }

  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <TableRow key={`loading-${index}`}>
          {columns.map((_, colIndex) => (
            <TableCell key={`loading-cell-${colIndex}`}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center py-8">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <MoreHorizontalIcon className="size-8 opacity-50" />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </TableCell>
    </TableRow>
  )

  const canGoPrevious = pagination && pagination.currentPage > 1
  const canGoNext = pagination && pagination.currentPage < pagination.totalPages

  return (
    <div className={cn("space-y-4", className)}>
      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    className={cn(
                      header.column.getCanSort() && "cursor-pointer hover:bg-muted/50 select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && getSortIcon(header.column.getIsSorted())}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              renderLoadingSkeleton()
            ) : table.getRowModel().rows.length === 0 ? (
              renderEmptyState()
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevPage}
              disabled={!canGoPrevious || loading}
              className="h-8 w-8 p-0"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={!canGoNext || loading}
              className="h-8 w-8 p-0"
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DGrid