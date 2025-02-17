export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: any) => string;
  sortable?: boolean; // default yes
  filterable?: boolean; // default yes
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

export const stringFilterSchemes = ["contains", "startsWith", "endsWith"] as const;
export type StringFilterScheme = typeof stringFilterSchemes[number];
export const stringFilterSchemeNames: Record<StringFilterScheme, string> = {
  contains: "Contains",
  startsWith: "Starts With",
  endsWith: "Ends With",
}
export interface StringFilterState extends AbstractFilterState {
  type: "string";
  scheme: StringFilterScheme;
  searchString: string;
}

export const numberFilterSchemes = ["equals"
, "greaterThan"
, "lessThan"
, "greaterOrEqual"
, "lessOrEqual"] as const;
export type NumberFilterScheme = typeof numberFilterSchemes[number];
export const numberFilterSchemeNames: Record<NumberFilterScheme, string> = {
  equals: "=",
  greaterThan: ">",
  lessThan: "<",
  greaterOrEqual: ">=",
  lessOrEqual: "<=",
}
export interface NumberFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  numValue: number | null; // null corresponds to empty string in the input element
}

export const dateFilterSchemes = ["startFrom" , "endAt" , "between"] as const
export type DateFilterScheme = typeof dateFilterSchemes[number];
export const dateFilterSchemeNames: Record<DateFilterScheme, string> = {
  startFrom: "Start Form",
  endAt: "End At",
  between: "Between"
}
export interface AbstractDateFilterState extends AbstractFilterState {
  type: "date" | "datetime";
  scheme: DateFilterScheme;
}
// Date and datetime input elements have an empty state. Null in the date fields
// correspond to this empty state.
export interface StartDateFilterState extends AbstractDateFilterState {
  scheme: "startFrom";
  startDate: Date | null;
}
export interface EndDateFilterState extends AbstractDateFilterState {
  scheme: "endAt";
  endDate: Date | null;
}
export interface BetweenDatesFilterState extends AbstractDateFilterState {
  scheme: "between";
  startDate: Date | null;
  endDate: Date | null;
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
