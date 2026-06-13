export type SortOrder = "asc" | "desc";

export interface SortColDef {
  name: string;
  order: SortOrder;
}

export interface ColSortModel {
  sortOrder: SortOrder | null;
  setSortOrder: (order: SortOrder | null) => void;
}

export interface ControlledTableSortModel {
  type?: "controlled";
  sortColDef: SortColDef | null;
  setSortColDef: (sortColDef: SortColDef | null) => void;
}

export interface UncontrolledTableSortModel {
  type: "uncontrolled";
  initialSortColDef: SortColDef | null;
}

export type TableSortModel =
  | ControlledTableSortModel
  | UncontrolledTableSortModel;
