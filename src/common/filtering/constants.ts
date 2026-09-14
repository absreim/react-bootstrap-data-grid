import { DateFilterScheme, NumberFilterScheme, StringFilterScheme } from "./types";

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
