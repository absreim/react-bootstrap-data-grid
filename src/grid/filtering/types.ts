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
  filterTableCaption?: string;
}

export interface NumberFormFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  inputValue: string;
}

// For schemes startFrom and endAt that do not use both date input fields, the
// fields still serve the purpose of remembering the previous value. That way,
// the user can switch between filtering schemes in the UI without losing their
// previously entered date.
export interface DateFormFilterState extends AbstractDateFilterState {
  scheme: DateFilterScheme;
  startDate: string;
  endDate: string;
}

// The string type in JavaScript already encompasses the full range of possibilities of the
// value of HTML text inputs. Therefore, unlike NumberFilterState and DateFilterState,
// StringFilterState is usable as it is to represent the state of a form input.
export type FilterFormRowState =
  | StringFilterState
  | NumberFormFilterState
  | DateFormFilterState;

export type FilterFormState = Record<string, FilterFormRowState>;
