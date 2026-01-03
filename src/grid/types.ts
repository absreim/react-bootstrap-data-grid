export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: any) => string;
  sortable?: boolean; // default false
}

export type RowDef = Record<string, ColDataType>;

export interface RowMetadata {
  origIndex: number;
}

export interface AugRowDef {
  data: RowDef;
  meta: RowMetadata;
}

export interface FormattedRow {
  contents: string[];
  origIndex: number;
}

export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type Size = "small" | "medium" | "large";

/* Sorting */

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

/* Filtering */

export type TableFilterState = Record<string, ColFilterState>;
export type EditableTableFilterState = Record<string, FilterState>;
export interface ColFilterState {
  editableState: FilterState;
  label: string;
}
export interface AbstractFilterState {
  enabled: boolean;
}

export const stringFilterSchemes = [
  "contains",
  "startsWith",
  "endsWith",
] as const;
export type StringFilterScheme = (typeof stringFilterSchemes)[number];
export const stringFilterSchemeNames: Record<StringFilterScheme, string> = {
  contains: "Contains",
  startsWith: "Starts With",
  endsWith: "Ends With",
};
export interface StringFilterState extends AbstractFilterState {
  type: "string";
  scheme: StringFilterScheme;
  searchString: string;
}

export const numberFilterSchemes = [
  "equals",
  "greaterThan",
  "lessThan",
  "greaterOrEqual",
  "lessOrEqual",
] as const;
export type NumberFilterScheme = (typeof numberFilterSchemes)[number];
export const numberFilterSchemeNames: Record<NumberFilterScheme, string> = {
  equals: "=",
  greaterThan: ">",
  lessThan: "<",
  greaterOrEqual: ">=",
  lessOrEqual: "<=",
};
export interface NumberFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  numValue: number | null; // null corresponds to empty string in the input element
}

export const dateFilterSchemes = ["startFrom", "endAt", "between"] as const;
export type DateFilterScheme = (typeof dateFilterSchemes)[number];
export const dateFilterSchemeNames: Record<DateFilterScheme, string> = {
  startFrom: "Start Form",
  endAt: "End At",
  between: "Between",
};
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
export type DateFilterState =
  | StartDateFilterState
  | EndDateFilterState
  | BetweenDatesFilterState;

export type FilterState =
  | StringFilterState
  | NumberFilterState
  | DateFilterState;

export interface FilterModel {
  tableFilterState: EditableTableFilterState;
  setTableFilterState: (state: EditableTableFilterState) => void;
}

/* Selection */

// column = can only select by clicking on radio or checkbox input in special column
// row = selection column is hidden and selection can be done by clicking anywhere in a row
// both = selection can be done by either clicking on the input or row
type SelectMode = "column" | "row" | "both"
export type SelectType = "single" | "multi"

export interface MultiSelectModel {
  mode: SelectMode;
  type: "multi";
  selected: number[];
  setSelected: (selected: number[]) => void;
}

export interface SingleSelectModel {
  mode: SelectMode;
  type: "single";
  selected: number | null;
  setSelected: (selected: number | null) => void;
}

// Selected indices are based on the original index of the input rows. If
// filtered-out items are included in the 'selected' property, there will be a
// visual indication to the user of that fact.

// One may consider designing the parent component that provides the selection
// and filtering models to reset selections whenever a new filter is applied.
export type SelectModel = SingleSelectModel | MultiSelectModel;
