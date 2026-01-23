import {
  AbstractDateFilterState,
  AbstractFilterState,
  DateFilterScheme,
  NumberFilterScheme,
  StringFilterState,
} from "../types";

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
