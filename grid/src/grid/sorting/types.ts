export type SortOrder = "asc" | "desc";

export interface SortColDef {
  name: string;
  order: SortOrder;
}

export interface ColSortModel {
  sortOrder: SortOrder | null;
  setSortOrder: (order: SortOrder | null) => void;
}

export interface TableSortModel {
  sortColDef: SortColDef | null;
  setSortColDef: (sortColDef: SortColDef | null) => void;
}
