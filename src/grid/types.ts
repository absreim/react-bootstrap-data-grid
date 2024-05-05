export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: any) => string;
  sortable?: boolean;
}

export type RowDef = Record<string, ColDataType>;

export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type Size = "small" | "medium" | "large";

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
