import { SortOrder } from "./types";

/**
 * Value-setter pair for the sort settings for a single column.
 *
 * @internal
 */
export interface ColSortModel {
  sortOrder: SortOrder | null;
  setSortOrder: (order: SortOrder | null) => void;
}
