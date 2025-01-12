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

export type TableFilterState = Record<string, ColFilterState>;
export type EditableTableFilterState = Record<string, FilterState>;
export interface ColFilterStateMetadata {
  label: string
}
export interface ColFilterState {
  editableState: FilterState
  metadata: ColFilterStateMetadata
}
export interface AbstractFilterState {
  enabled: boolean;
}
export type StringFilterScheme = "contains" | "startsWith" | "endsWith";
export interface StringFilterState extends AbstractFilterState {
  type: "string";
  scheme: StringFilterScheme;
  searchString: string;
}
export type NumberFilterScheme =
  | "equals"
  | "greaterThan"
  | "lessThan"
  | "greaterOrEqual"
  | "lessOrEqual";
export interface NumberFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  numInputValue: string;
}
export type DateFilterScheme = "startFrom" | "endAt" | "between";
export interface AbstractDateFilterState extends AbstractFilterState {
  type: "date" | "datetime";
  scheme: DateFilterScheme;
}
export interface StartDateFilterState extends AbstractDateFilterState {
  scheme: "startFrom";
  startDate: Date;
}
export interface EndDateFilterState extends AbstractDateFilterState {
  scheme: "endAt";
  endDate: Date;
}
export interface BetweenDatesFilterState extends AbstractDateFilterState {
  scheme: "between";
  startDate: Date;
  endDate: Date;
}
export type DateFilterState = StartDateFilterState | EndDateFilterState | BetweenDatesFilterState

export type FilterState =
  | StringFilterState
  | NumberFilterState
  | DateFilterState;

export interface FilterModel {
  tableFilterState: TableFilterState;
  setTableFilterState: (state: EditableTableFilterState) => void;
}
