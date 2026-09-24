/**
 * Generic Pagination Types for DIZTINCT TOUCH HOME DESIGNS
 * Supporting backend-paginated queries across projects, leads, and telemetry.
 */

export interface PaginationParams {
  /** 1-based page index (defaults to 1) */
  page?: number;
  /** Items per page (defaults to 10) */
  pageSize?: number;
}

export interface PaginatedResult<T> {
  /** Array of records for current page */
  data: T[];
  /** Total count of records across all pages */
  totalCount: number;
  /** Active page number (1-based) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of calculated pages */
  totalPages: number;
  /** Whether there is a subsequent page */
  hasNextPage: boolean;
  /** Whether there is a preceding page */
  hasPreviousPage: boolean;
}
