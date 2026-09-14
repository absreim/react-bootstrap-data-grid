import {
  AbstractDateFilterState,
  AbstractFilterState,
  ControlledFilterModel,
  DateFilterScheme,
  DateFilterState,
  NumberFilterScheme,
  NumberFilterState,
  StringFilterState
} from "./types";

/**
 * Like {@link EditableColFilterState}, but includes additional metadata.
 *
 * @internal
 */
export interface ColFilterState {
  editableState: EditableColFilterState;
  label: string;
}

/**
 * Like {@link EditableFilterState}, but includes additional metadata.
 *
 * @internal
 */
export type FilterState = Record<string, ColFilterState>;

/**
 * The form state object for the filtering feature for a column.
 *
 * @public
 */
export type EditableColFilterState =
  | StringFilterState
  | NumberFilterState
  | DateFilterState;

/**
 * An effective value for the filter model of a grid or table based on
 * whether the controlled or uncontrolled mode was chosen.
 *
 * @internal
 */
export type NormalizedTableFilterModel = Pick<
  ControlledFilterModel,
  "tableFilterState" | "setTableFilterState"
>;

/**
 * Represents the form state for a number column in the filter settings UI.
 * This interface differs from {@link NumberFilterState} because numerical
 * HTML input elements are better represented by strings.
 *
 * @internal
 */
export interface NumberFormFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  inputValue: string;
}

/**
 * Represents the form state for a date or datetime column in the filter
 * settings UI. This interface differs from {@link NumberFilterState} because
 * numerical HTML input elements are better represented by strings.
 *
 * @remarks
 *
 * For schemes startFrom and endAt that do not use both date input fields, the
 * unused field still serves the purpose of remembering the previous value. That
 * way, the user can switch between filtering schemes in the UI without losing
 * their previously entered date.
 *
 * @internal
 */
export interface DateFormFilterState extends AbstractDateFilterState {
  scheme: DateFilterScheme;
  startDate: string;
  endDate: string;
}

/**
 * Represents the actual form state for a column in the filtering settings UI.
 * Differs from {@link EditableColFilterState} because the HTML input fields
 * for number and dates are better represented by strings.
 *
 * @remarks
 *
 * The string type in JavaScript already encompasses the full range of
 * possibilities of the value of HTML text inputs. Therefore, unlike
 * {@link NumberFilterState} and {@link DateFilterState},
 * {@link StringFilterState} is usable as it is to represent the state of a form
 * input.
 *
 * @internal
 */
export type FilterFormRowState =
  | StringFilterState
  | NumberFormFilterState
  | DateFormFilterState;

/**
 * Represents the form state for filter settings for all columns in a grid or
 * table.
 *
 * @internal
 */
export type FilterFormState = Record<string, FilterFormRowState>;
