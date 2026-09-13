/**
 * Like {@link EditableFilterState}, but includes additional metadata.
 *
 * @internal
 */
export type FilterState = Record<string, ColFilterState>;

/**
 * State object that represents the filter settings for all of the columns in a
 * grid or table.
 *
 * @public
 */
export type EditableFilterState = Record<string, EditableColFilterState>;

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
 * Base interface for various objects that represent the form state for the
 * filter settings of a single column.
 *
 * @public
 */
export interface AbstractFilterState {
  /**
   * Indicates whether filtering is enabled on the associated row.
   */
  enabled: boolean;
}

/**
 * An array of all possible values of {@link StringFilterScheme}.
 *
 * @public
 */
export const stringFilterSchemes = [
  /**
   * Displays the row as long as the search string exists anywhere in the
   * associated cell's value.
   */
  "contains",
  /**
   * Displays the row only if the search string is at the beginning of the
   * associated cell's value.
   */
  "startsWith",
  /**
   * Displays the row only if the search string is at the end of the
   * associated cell's value.
   */
  "endsWith",
] as const;

/**
 * Represents all possible filter schemes for a string column.
 *
 * @public
 */
export type StringFilterScheme = (typeof stringFilterSchemes)[number];

/**
 * A mapping of {@link StringFilterScheme} to display names.
 *
 * @internal
 */
export const stringFilterSchemeNames: Record<StringFilterScheme, string> = {
  contains: "Contains",
  startsWith: "Starts With",
  endsWith: "Ends With",
};

/**
 * Form state for the filter settings for a string column.
 *
 * @public
 */
export interface StringFilterState extends AbstractFilterState {
  /**
   * A type discriminator.
   */
  type: "string";
  /**
   * The filter scheme to apply.
   */
  scheme: StringFilterScheme;
  /**
   * The search string to filter on.
   */
  searchString: string;
}

/**
 * An array of all possible values of {@link NumberFilterScheme}.
 *
 * @public
 */
export const numberFilterSchemes = [
  /**
   * Displays the row only if the value of the cell equals the inputted number.
   */
  "equals",
  /**
   * Displays the row only if the value of the cell is greater than the inputted
   * number.
   */
  "greaterThan",
  /**
   * Displays the row only if the value of the cell is less than the inputted
   * number.
   */
  "lessThan",
  /**
   * Displays the row only if the value of the cell is greater than or equal
   * to the inputted number.
   */
  "greaterOrEqual",
  /**
   * Displays the row only if the value of the cell is less than or equal to
   * the inputted number.
   */
  "lessOrEqual",
] as const;

/**
 * Indicates the filtering scheme to apply to a number column.
 *
 * @public
 */
export type NumberFilterScheme = (typeof numberFilterSchemes)[number];

/**
 * A mapping of display names for {@link NumberFilterScheme}.
 *
 * @internal
 */
export const numberFilterSchemeNames: Record<NumberFilterScheme, string> = {
  equals: "=",
  greaterThan: ">",
  lessThan: "<",
  greaterOrEqual: ">=",
  lessOrEqual: "<=",
};

/**
 * The form state for filter settings on a number column.
 *
 * @public
 */
export interface NumberFilterState extends AbstractFilterState {
  type: "number";
  scheme: NumberFilterScheme;
  numValue: number | null; // null corresponds to empty string in the input element
}

/**
 * An array of all possible values for {@link DateFilterScheme}.
 *
 * @public
 */
export const dateFilterSchemes = ["startFrom", "endAt", "between"] as const;

/**
 * Indicates the filtering scheme to apply to date and datetime columns.
 *
 * @public
 */
export type DateFilterScheme = (typeof dateFilterSchemes)[number];

/**
 * A mapping of display names for {@link DateFilterScheme}.
 *
 * @internal
 */
export const dateFilterSchemeNames: Record<DateFilterScheme, string> = {
  /**
   * Displays the row only if {@link Date} value occurs on or after the
   * inputted {@link Date}.
   */
  startFrom: "Start Form",
  /**
   * Displays the row only if {@link Date} value occurs on or before the
   * inputted {@link Date}.
   */
  endAt: "End At",
  /**
   * Displays the row only if {@link Date} value occurs between the
   * inputted before and end dates, inclusive.
   */
  between: "Between",
};

/**
 * A base interface for {@link DateFilterState}.
 *
 * @remarks
 *
 * Date and datetime input elements can have a state where there is no input.
 * Nulls in the date fields correspond to this empty state.
 *
 * @public
 */
export interface AbstractDateFilterState extends AbstractFilterState {
  type: "date" | "datetime";
  scheme: DateFilterScheme;
}

/**
 * Object that holds the form state for date or datetime column filtered via the
 * "startFrom" scheme.
 *
 * @public
 */
export interface StartDateFilterState extends AbstractDateFilterState {
  scheme: "startFrom";
  startDate: Date | null;
}

/**
 * Object that holds the form state for date or datetime column filtered via the
 * "endAt" scheme.
 *
 * @public
 */
export interface EndDateFilterState extends AbstractDateFilterState {
  scheme: "endAt";
  endDate: Date | null;
}

/**
 * Object that holds the form state for date or datetime column filtered via the
 * "between" scheme.
 *
 * @public
 */
export interface BetweenDatesFilterState extends AbstractDateFilterState {
  scheme: "between";
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * The form state object for the filtering feature for a date or datetime
 * column.
 *
 * @public
 */
export type DateFilterState =
  | StartDateFilterState
  | EndDateFilterState
  | BetweenDatesFilterState;

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
 * Object that enables the filtering feature on a grid or table in an
 * externally controllable manner.
 *
 * @public
 */
export interface ControlledFilterModel {
  /**
   * A type discriminator.
   */
  type?: "controlled";
  /**
   * State object that represents the filters currently being applied to the
   * table or grid.
   */
  tableFilterState: EditableFilterState;
  /**
   * Update callback function for the tableFilterState property. This function
   * is called when the user submits the filter settings form.
   */
  setTableFilterState: (state: EditableFilterState) => void;
  /**
   * Caption for the filter settings table element.
   *
   * @defaultValue undefined - no caption will be displayed
   */
  filterTableCaption?: string;
}

/**
 * Object that enables the filtering feature on a grid or table in manner that
 * cannot be controlled externally. In this mode, "tableFilterState" is the
 * initial set of filtering settings.
 *
 * @public
 */
export type UncontrolledFilterModel = Partial<
  Pick<ControlledFilterModel, "tableFilterState" | "filterTableCaption">
> & {
  type: "uncontrolled";
};

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
 * Object used to enable and configure filtering for a grid or table.
 *
 * @public
 */
export type FilterModel = ControlledFilterModel | UncontrolledFilterModel;

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
