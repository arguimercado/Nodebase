"use client"

import * as React from "react"
import { createContext, useContext, useMemo } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MoreHorizontalIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef as TanstackColumnDef,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
  type Table as TanstackTable,
  type Row,
  type Header,
  type Cell,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// ============================================================================
// Types - Re-export TanStack types for convenience
// ============================================================================

export type { SortingState, PaginationState, RowSelectionState }
export type ColumnDef<TData, TValue = unknown> = TanstackColumnDef<TData, TValue>

export interface PaginationConfig {
  pageIndex: number
  pageSize: number
  pageCount?: number
  rowCount?: number
  pageSizeOptions?: number[]
}

// ============================================================================
// Context
// ============================================================================

interface DGridContextType<TData = any> {
  table: TanstackTable<TData>
  loading: boolean
  emptyMessage: string
  loadingRows: number
}

const DGridContext = createContext<DGridContextType | undefined>(undefined)

function useDGrid<TData = any>() {
  const context = useContext(DGridContext)
  if (!context) {
    throw new Error("useDGrid must be used within a DGridProvider")
  }
  return context as DGridContextType<TData>
}

// ============================================================================
// DGridProvider
// ============================================================================

export interface DGridProviderProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  loading?: boolean
  
  // Sorting
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  enableSorting?: boolean
  manualSorting?: boolean
  
  // Pagination
  pagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  manualPagination?: boolean
  pageCount?: number
  rowCount?: number
  
  // Row Selection
  rowSelection?: RowSelectionState
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean)
  enableMultiRowSelection?: boolean
  
  // Display
  emptyMessage?: string
  loadingRows?: number
  children: React.ReactNode
  className?: string
  
  // Row ID
  getRowId?: (originalRow: TData, index: number) => string
}

function DGridProvider<TData extends Record<string, any>>({
  data,
  columns,
  loading = false,
  
  // Sorting
  sorting: controlledSorting,
  onSortingChange,
  enableSorting = true,
  manualSorting = false,
  
  // Pagination
  pagination: controlledPagination,
  onPaginationChange,
  manualPagination = false,
  pageCount,
  rowCount,
  
  // Row Selection
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  enableRowSelection = false,
  enableMultiRowSelection = true,
  
  // Display
  emptyMessage = "No data available",
  loadingRows = 5,
  children,
  className,
  
  // Row ID
  getRowId,
}: DGridProviderProps<TData>) {
  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})

  // Determine if controlled or uncontrolled
  const sorting = controlledSorting ?? internalSorting
  const pagination = controlledPagination ?? internalPagination
  const rowSelection = controlledRowSelection ?? internalRowSelection

  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const newValue = typeof updater === "function" ? updater(sorting) : updater
      if (onSortingChange) {
        onSortingChange(newValue)
      } else {
        setInternalSorting(newValue)
      }
    },
    [sorting, onSortingChange]
  )

  const handlePaginationChange = React.useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const newValue = typeof updater === "function" ? updater(pagination) : updater
      if (onPaginationChange) {
        onPaginationChange(newValue)
      } else {
        setInternalPagination(newValue)
      }
    },
    [pagination, onPaginationChange]
  )

  const handleRowSelectionChange = React.useCallback(
    (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      const newValue = typeof updater === "function" ? updater(rowSelection) : updater
      if (onRowSelectionChange) {
        onRowSelectionChange(newValue)
      } else {
        setInternalRowSelection(newValue)
      }
    },
    [rowSelection, onRowSelectionChange]
  )

  const table = useReactTable({
    data: loading ? [] : data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    
    // Core
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    
    // Sorting
    enableSorting,
    manualSorting,
    onSortingChange: handleSortingChange,
    getSortedRowModel: getSortedRowModel(),
    
    // Pagination
    manualPagination,
    onPaginationChange: handlePaginationChange,
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: manualPagination ? pageCount : undefined,
    rowCount: manualPagination ? rowCount : undefined,
    
    // Row Selection
    enableRowSelection,
    enableMultiRowSelection,
    onRowSelectionChange: handleRowSelectionChange,
    
    // Filtering
    getFilteredRowModel: getFilteredRowModel(),
  })

  const value = useMemo(
    () => ({
      table,
      loading,
      emptyMessage,
      loadingRows,
    }),
    [table, loading, emptyMessage, loadingRows]
  )

  return (
    <DGridContext.Provider value={value}>
      <div className={cn("space-y-4", className)}>
        {children}
      </div>
    </DGridContext.Provider>
  )
}

// ============================================================================
// DGridTable
// ============================================================================

export interface DGridTableProps {
  children: React.ReactNode
  className?: string
}

function DGridTable({ children, className }: DGridTableProps) {
  return (
    <div className={cn("border rounded-lg", className)}>
      <Table>{children}</Table>
    </div>
  )
}

// ============================================================================
// DGridColumns
// ============================================================================

export interface DGridColumnsProps {
  className?: string
  enableCheckbox?: boolean
}

function DGridColumns({ className, enableCheckbox = false }: DGridColumnsProps) {
  const { table, loading } = useDGrid()

  const getSortIcon = (header: Header<any, unknown>) => {
    const isSorted = header.column.getIsSorted()
    if (!header.column.getCanSort()) return null
    
    if (isSorted === "asc") {
      return <ArrowUpIcon className="ml-2 size-4" />
    }
    if (isSorted === "desc") {
      return <ArrowDownIcon className="ml-2 size-4" />
    }
    return <ArrowUpDownIcon className="ml-2 size-4 opacity-50" />
  }

  const isAllSelected = table.getIsAllPageRowsSelected()
  const isSomeSelected = table.getIsSomePageRowsSelected()

  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {enableCheckbox && (
            <TableHead className="w-[32px] px-2" style={{ width: 32 }}>
              <Checkbox
                checked={isAllSelected || (isSomeSelected && "indeterminate")}
                onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                aria-label="Select all"
                disabled={loading}
              />
            </TableHead>
          )}
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort()
            return (
              <TableHead
                key={header.id}
                style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                className={cn(
                  canSort && !loading && "cursor-pointer hover:bg-muted/50 select-none"
                )}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {getSortIcon(header)}
                </div>
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

// ============================================================================
// DGridRows
// ============================================================================

export interface DGridRowsProps<TData = any> {
  className?: string
  onRowClick?: (row: Row<TData>) => void
  rowClassName?: string | ((row: Row<TData>) => string)
  enableCheckbox?: boolean
}

function DGridRows<TData>({ className, onRowClick, rowClassName, enableCheckbox = false }: DGridRowsProps<TData>) {
  const { table, loading, loadingRows, emptyMessage } = useDGrid<TData>()

  const columns = table.getAllColumns()
  const colSpan = enableCheckbox ? columns.length + 1 : columns.length

  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <TableRow key={`loading-${index}`}>
          {enableCheckbox && (
            <TableCell className="w-[32px] px-2">
              <Skeleton className="size-4" />
            </TableCell>
          )}
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
      <TableCell colSpan={colSpan} className="text-center py-8">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <MoreHorizontalIcon className="size-8 opacity-50" />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </TableCell>
    </TableRow>
  )

  const getRowClassName = (row: Row<TData>) => {
    if (typeof rowClassName === "function") {
      return rowClassName(row)
    }
    return rowClassName
  }

  const rows = table.getRowModel().rows
  console.log("DGridRows rows:", rows)
  return (
    <TableBody className={className}>
      {loading ? (
        renderLoadingSkeleton()
      ) : rows.length === 0 ? (
        renderEmptyState()
      ) : (
        rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={cn(
              onRowClick && "cursor-pointer",
              getRowClassName(row)
            )}
            onClick={() => onRowClick?.(row)}
          >
            {enableCheckbox && (
              <TableCell className="w-[32px] px-2" style={{ width: 32 }}>
                <Checkbox
                  checked={row.getIsSelected()}
                  onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Select row"
                  disabled={!row.getCanSelect()}
                />
              </TableCell>
            )}
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  )
}

// ============================================================================
// DGridPagination
// ============================================================================

export interface DGridPaginationProps {
  className?: string
  showRowsPerPage?: boolean
  showPageInfo?: boolean
  showFirstLast?: boolean
  pageSizeOptions?: number[]
}

function DGridPagination({
  className,
  showRowsPerPage = true,
  showPageInfo = true,
  showFirstLast = true,
  pageSizeOptions = [10, 20, 50, 100],
}: DGridPaginationProps) {
  const { table, loading } = useDGrid()

  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()
  const rowCount = table.getRowCount()
  
  const startRow = pageIndex * pageSize + 1
  const endRow = Math.min((pageIndex + 1) * pageSize, rowCount)

  const canGoPrevious = table.getCanPreviousPage()
  const canGoNext = table.getCanNextPage()

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(parseInt(value))
  }

  return (
    <div className={cn("flex items-center justify-between px-2 py-4", className)}>
      {/* Left side - Rows per page selector */}
      <div className="flex items-center gap-4">
        {showRowsPerPage && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
              disabled={loading}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showPageInfo && (
          <div className="text-sm text-muted-foreground">
            {rowCount > 0
              ? `Showing ${startRow} to ${endRow} of ${rowCount} entries`
              : "No entries"}
          </div>
        )}
      </div>

      {/* Right side - Page navigation */}
      <div className="flex items-center gap-2">
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!canGoPrevious || loading}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!canGoPrevious || loading}
          className="h-8 w-8 p-0"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <span className="text-sm font-medium min-w-[100px] text-center">
          Page {pageIndex + 1} of {pageCount || 1}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!canGoNext || loading}
          className="h-8 w-8 p-0"
        >
          <ChevronRightIcon className="size-4" />
        </Button>

        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!canGoNext || loading}
            className="h-8 w-8 p-0"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Exports
// ============================================================================

export {
  DGridProvider,
  DGridTable,
  DGridColumns,
  DGridRows,
  DGridPagination,
  useDGrid,
}

export type { DGridContextType }