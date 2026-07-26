export type SortOrder = "asc" | "desc";

export interface SortColDef {
  name: string;
  order: SortOrder;
}

export interface ColSortModel {
  sortOrder: SortOrder | null;
  setSortOrder: (order: SortOrder | null) => void;
}

export interface ControlledSortModel {
  type?: "controlled";
  sortColDef: SortColDef | null;
  setSortColDef: (sortColDef: SortColDef | null) => void;
}

export interface UncontrolledSortModel {
  type: "uncontrolled";
  initialSortColDef: SortColDef | null;
}

export type SortModel = ControlledSortModel | UncontrolledSortModel;
