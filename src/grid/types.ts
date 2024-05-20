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

export interface FilterState {
  enabled: boolean;
}
export type StringFilterScheme = "contains" | "startsWith" | "endsWith";
export interface StringFilterState extends FilterState {
  scheme: StringFilterScheme;
  searchString: string;
}
export type NumberFilterScheme =
  | "equals"
  | "greaterThan"
  | "lessThan"
  | "greaterOrEqual"
  | "lessOrEqual";
export interface NumberFilterState extends FilterState {
  scheme: NumberFilterScheme;
  numInputValue: string;
}
export type DateFilterScheme = "startFrom" | "endAt" | "between";
export interface DateFilterState extends FilterState {
  scheme: DateFilterScheme;
}
export interface StartDateFilterState extends DateFilterState {
  scheme: "startFrom";
  startDate: Date;
}
export interface EndDateFilterState extends DateFilterState {
  scheme: "endAt";
  endDate: Date;
}
export interface BetweenDatesFilterState extends DateFilterState {
  scheme: "between";
  startDate: Date;
  endDate: Date;
}
