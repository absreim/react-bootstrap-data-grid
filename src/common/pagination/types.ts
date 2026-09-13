/**
 * Strings representing different possible values of the
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content | justify-content CSS property}.
 *
 * @public
 */
export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

/**
 * Strings representing the different
 * {@link https://getbootstrap.com/docs/5.3/components/pagination/#sizing | possible sizes of the Bootstrap pagination component}.
 *
 * @public
 */
export type Size = "small" | "medium" | "large";

/**
 * Options for the pagination feature.
 *
 * @public
 */
export interface PaginationOptions {
  /**
   * An array of page sizes that can be selected by the user.
   *
   * @defaultValue [10, 25, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Maximum number of buttons pointing to numerically-indexed pages that can
   * be displayed at once.
   *
   * @defaultValue 5
   */
  maxPageButtons?: number;

  /**
   * The size of the pagination component. Set via CSS classes provided with
   * Bootstrap.
   *
   * @defaultValue "medium" - corresponds to not specifying a CSS class for
   * pagination component size
   */
  componentSize?: Size;

  /**
   * The ARIA label for the nav element that represents the pagination
   * component.
   *
   * @defaultValue undefined - no ARIA label
   */
  pageSelectorAriaLabel?: string;

  /**
   * Justify-content CSS property for the ul element of the pagination
   * component.
   *
   * @defaultValue undefined - no justify-content property is specified, which
   * acts like "start" based on CSS standards. See
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content#syntax}.
   */
  pageSelectorJustifyContent?: JustifyContentSetting;
}

/**
 * Properties specific to configuring pagination in a controlled manner.
 *
 * @public
 */
export interface ControlledPaginationState {
  /**
   * A type discriminator.
   */
  type?: "controlled";
  /**
   * The index of current page size setting in the array of settings.
   */
  pageSizeIndex: number;
  /**
   * Setter function for the page size index.
   */
  setPageSizeIndex: (pageSizeIndex: number) => void;
  /**
   * The 1-based index of the currently displayed page.
   */
  currentPage: number;
  /**
   * Sets the current page index.
   */
  setCurrentPage: (pageNum: number) => void;
}

/**
 * Object that enables and configures the pagination feature for a table or
 * grid in an externally-controllable manner.
 *
 * @public
 */
export type ControlledPaginationModel = PaginationOptions & ControlledPaginationState;

/**
 * Initial values for pagination in uncontrolled mode.
 *
 * @public
 */
export interface UncontrolledPaginationInitState {
  /**
   * A type discriminator.
   */
  type: "uncontrolled";
  /**
   * Starting page size setting index of pageSizeOptions array.
   */
  startingPageSizeIndex?: number;
  /**
   * Starting 1-based current page number.
   */
  startingCurrentPage?: number;
}

/**
 * Object that enables and configures pagination in an uncontrolled manner.
 *
 * @public
 */
export type UncontrolledPaginationModel = PaginationOptions & UncontrolledPaginationInitState;

/**
 * Object that enables and configures pagination for a grid or table.
 */
export type PaginationModel =
  | ControlledPaginationModel
  | UncontrolledPaginationModel;

/**
 * Effective value for the {@link PaginationModel} that takes in values
 * depending on whether controlled or uncontrolled mode is selected.
 *
 * @internal
 */
export type NormalizedPaginationModel = Required<
  Omit<
    ControlledPaginationModel,
    "type" | "pageSelectorAriaLabel" | "pageSelectorJustifyContent"
  >
> &
  Pick<
    ControlledPaginationModel,
    "pageSelectorAriaLabel" | "pageSelectorJustifyContent"
  >;
