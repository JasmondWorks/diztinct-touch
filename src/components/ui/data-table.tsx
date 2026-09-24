"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./table";
import { Skeleton } from "./skeleton";
import { EmptyState } from "./empty-state";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColumnDef<TData> {
  id?: string;
  header: React.ReactNode | ((context: { column: ColumnDef<TData> }) => React.ReactNode);
  accessorKey?: keyof TData | string;
  cell?: (context: { row: TData; index: number }) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<TData> {
  /** Array of column specifications */
  columns: ColumnDef<TData>[];
  /** Array of row data */
  data: TData[];
  /** Loading state indicator */
  loading?: boolean;
  /** Whether pagination controls are enabled. Defaults to true */
  isPaginated?: boolean;
  /** Number of skeleton placeholder rows shown when loading. Defaults to 5 */
  numLoaderRows?: number;
  /** Custom empty state message. Passed to EmptyState */
  emptyMessage?: string;
  /** Custom empty state title. Defaults to "No Records Found" */
  emptyTitle?: string;
  /** Optional icon for empty state */
  emptyIcon?: LucideIcon;
  /** Optional primary action label for empty state */
  emptyActionLabel?: string;
  /** Optional primary action callback for empty state */
  onEmptyAction?: () => void;

  /* ============================================================
     BACKEND PAGINATION PROPS
     Everything on the platform should cater for backend pagination
     ============================================================ */
  /** Current page index (1-based, defaults to 1) */
  page?: number;
  /** Number of rows per page. Defaults to 10 */
  pageSize?: number;
  /** Total count of records from backend */
  totalCount?: number;
  /** Total count of pages from backend (calculated from totalCount if omitted) */
  totalPages?: number;
  /** Callback fired when page number changes */
  onPageChange?: (page: number) => void;
  /** Callback fired when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Options for rows-per-page dropdown. Defaults to [5, 10, 20, 50] */
  pageSizeOptions?: number[];

  /** Optional callback fired when a row is clicked */
  onRowClick?: (row: TData, index: number) => void;
  /** Optional custom row key extractor */
  rowKey?: (row: TData, index: number) => string | number;
  /** Container class */
  className?: string;
  /** Inner table class */
  tableClassName?: string;
  /**
   * Minimum width applied to the table element to guarantee comfortable column widths
   * and activate automatic horizontal scrolling when viewport or container is too small.
   * Defaults to "min-w-[750px]" for >= 6 columns, "min-w-[620px]" for >= 4 columns, or "min-w-full".
   */
  minWidth?: string;
}

export function DataTable<TData>({
  columns,
  data = [],
  loading = false,
  isPaginated = true,
  numLoaderRows = 5,
  emptyMessage,
  emptyTitle = "No Records Found",
  emptyIcon = Search,
  emptyActionLabel,
  onEmptyAction,
  page: controlledPage,
  pageSize: controlledPageSize = 10,
  totalCount: backendTotalCount,
  totalPages: backendTotalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  onRowClick,
  rowKey,
  className,
  tableClassName,
  minWidth,
}: DataTableProps<TData>) {
  // Local state for uncontrolled pagination (fallback when onPageChange is not passed)
  const [internalPage, setInternalPage] = useState<number>(1);
  const [internalPageSize, setInternalPageSize] = useState<number>(controlledPageSize);

  const isBackendPaginated = Boolean(onPageChange);
  const activePage = isBackendPaginated ? (controlledPage ?? 1) : internalPage;
  const activePageSize = isBackendPaginated
    ? (controlledPageSize ?? 10)
    : internalPageSize;

  // Determine total records
  const totalRecords = isBackendPaginated
    ? (backendTotalCount ?? data.length)
    : data.length;

  const totalPages = isBackendPaginated
    ? (backendTotalPages ?? Math.max(1, Math.ceil(totalRecords / activePageSize)))
    : Math.max(1, Math.ceil(data.length / activePageSize));

  // Determine slice of data to display
  const displayData = React.useMemo(() => {
    if (isBackendPaginated) {
      // Backend already returns the paginated slice
      return data;
    }
    if (!isPaginated) {
      return data;
    }
    const startIndex = (activePage - 1) * activePageSize;
    return data.slice(startIndex, startIndex + activePageSize);
  }, [data, isBackendPaginated, isPaginated, activePage, activePageSize]);

  // Pagination navigation helpers
  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(newPage, totalPages));
    if (isBackendPaginated) {
      onPageChange?.(clamped);
    } else {
      setInternalPage(clamped);
    }
  };

  const handlePageSizeChange = (newSizeStr: string) => {
    const newSize = parseInt(newSizeStr, 10);
    if (isNaN(newSize)) return;

    if (isBackendPaginated) {
      onPageSizeChange?.(newSize);
      onPageChange?.(1);
    } else {
      setInternalPageSize(newSize);
      setInternalPage(1);
    }
  };

  const fromEntry = totalRecords === 0 ? 0 : (activePage - 1) * activePageSize + 1;
  const toEntry = Math.min(activePage * activePageSize, totalRecords);

  const getAlignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  const getRowIdentifier = (row: TData, index: number): string | number => {
    if (rowKey) return rowKey(row, index);
    const candidate = row as any;
    if (candidate && candidate.id !== undefined) return candidate.id;
    if (candidate && candidate._id !== undefined) return candidate._id;
    return index;
  };

  const effectiveMinWidth = React.useMemo(() => {
    if (minWidth) return minWidth;
    if (columns.length >= 6) return "min-w-[780px]";
    if (columns.length >= 4) return "min-w-[620px]";
    return "min-w-full";
  }, [minWidth, columns.length]);

  return (
    <div
      className={cn(
        "rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 overflow-hidden flex flex-col w-full max-w-full",
        className
      )}
    >
      <div className="relative w-full max-w-full">
        <Table className={cn(effectiveMinWidth, tableClassName)}>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => {
                const headerContent =
                  typeof col.header === "function"
                    ? col.header({ column: col })
                    : col.header;

                return (
                  <TableHead
                    key={col.id || String(col.accessorKey) || idx}
                    className={cn("whitespace-nowrap", getAlignClass(col.align), col.headerClassName)}
                  >
                    {headerContent}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Skeleton Loader Rows
              Array.from({ length: numLoaderRows }).map((_, rIdx) => (
                <TableRow key={`skeleton-row-${rIdx}`} className="hover:bg-transparent">
                  {columns.map((col, cIdx) => (
                    <TableCell
                      key={`skeleton-cell-${rIdx}-${cIdx}`}
                      className={cn(getAlignClass(col.align), col.className)}
                    >
                      <Skeleton className="h-5 w-full max-w-[85%] rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : displayData.length === 0 ? (
              // Empty State Cell
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="py-8 px-4">
                  <EmptyState
                    compact
                    icon={emptyIcon}
                    title={emptyTitle}
                    description={
                      emptyMessage ||
                      "No records match your criteria. Try adjusting your filters or search."
                    }
                    actionLabel={emptyActionLabel}
                    onAction={onEmptyAction}
                  />
                </TableCell>
              </TableRow>
            ) : (
              // Active Data Rows
              displayData.map((row, rIdx) => {
                const isClickable = Boolean(onRowClick);

                return (
                  <TableRow
                    key={getRowIdentifier(row, rIdx)}
                    onClick={() => onRowClick?.(row, rIdx)}
                    className={cn(
                      "transition-colors",
                      isClickable && "cursor-pointer hover:bg-muted/30"
                    )}
                  >
                    {columns.map((col, cIdx) => {
                      let cellContent: React.ReactNode = null;

                      if (col.cell) {
                        cellContent = col.cell({ row, index: rIdx });
                      } else if (col.accessorKey) {
                        const val = (row as any)[col.accessorKey];
                        cellContent = val !== undefined && val !== null ? String(val) : "—";
                      }

                      return (
                        <TableCell
                          key={col.id || String(col.accessorKey) || cIdx}
                          className={cn(getAlignClass(col.align), col.className)}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {isPaginated && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3.5 border-t border-border/80 bg-muted/20 text-xs">
          {/* Left: Record Range Summary */}
          <div className="text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
            {loading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <span>
                Showing <strong className="text-foreground">{fromEntry}</strong> to{" "}
                <strong className="text-foreground">{toEntry}</strong> of{" "}
                <strong className="text-foreground">{totalRecords}</strong> entries
              </span>
            )}
          </div>

          {/* Right: Controls & Page Jumpers */}
          <div className="flex items-center gap-3 order-1 sm:order-2 flex-wrap justify-center sm:justify-end">
            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground hidden sm:inline">Rows per page:</span>
              <Select
                value={String(activePageSize)}
                onValueChange={handlePageSizeChange}
                disabled={loading}
              >
                <SelectTrigger className="h-8 w-[72px] text-xs">
                  <SelectValue placeholder={String(activePageSize)} />
                </SelectTrigger>
                <SelectContent align="end">
                  {pageSizeOptions.map((opt) => (
                    <SelectItem key={opt} value={String(opt)} className="text-xs">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page Count */}
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              Page <strong className="text-foreground">{activePage}</strong> of{" "}
              <strong className="text-foreground">{totalPages}</strong>
            </span>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={loading || activePage <= 1}
                className="h-8 w-8 rounded-lg"
                title="First Page"
                aria-label="First Page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(activePage - 1)}
                disabled={loading || activePage <= 1}
                className="h-8 w-8 rounded-lg"
                title="Previous Page"
                aria-label="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(activePage + 1)}
                disabled={loading || activePage >= totalPages}
                className="h-8 w-8 rounded-lg"
                title="Next Page"
                aria-label="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={loading || activePage >= totalPages}
                className="h-8 w-8 rounded-lg"
                title="Last Page"
                aria-label="Last Page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
