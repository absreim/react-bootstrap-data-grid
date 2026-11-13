import { PaginationModel } from "../../common";

/**
 * Object that contains preset style options involving the pagination UI
 * components. These settings are in contrast to the alternative means of
 * controlling styling that involve applying custom CSS classes to different
 * slots.
 *
 * @public
 */
export interface PaginationStyleOptions {
  /**
   * Sets whether the pagination components are positioned above the main
   * grid or table component.
   *
   * @defaultValue `false` - pagination components are positioned below the main
   * component.
   */
  aboveMainComponent?: boolean;

  /**
   * Sets whether the page size selector dropdown menu is placed to the right of
   * the page number selector.
   *
   * @defaultValue `false` - the page size selector dropdown menu is placed
   * before (to the left of) the page number selector component.
   */
  sizeSelectAfterPageSelect?: boolean;

  /**
   * Sets the horizontal alignment of the pagination UI components.
   *
   * @defaultValue `"right"` - both pagination UI components, the page size
   * selector and page number selector, are aligned to the left of the
   * enclosing div.
   */
  horizontalAlignment?: "left" | "center" | "right";

  /**
   * Copy of the property of the same name in the {@link StyleOptions}
   * interface. The value of the {@link StyleOptions} property takes
   * precedence. This value is only used if the other value doesn't exist.
   *
   * @deprecated Use the property in the {@link StyleOptions} interface instead.
   * The property is only kept around for backwards compatibility and may be
   * removed in the next major release.
   */
  mainComponentSpacing?: number;

  /**
   * Sets the amount of horizontal spacing between page size selector and page
   * number selector. The number supplied to this
   * property will be used for the
   * {@link https://getbootstrap.com/docs/5.3/utilities/spacing/#gap | Bootstrap gap utility}.
   * Valid values depend on Bootstrap `$spacers` Sass map. Be default, the valid
   * values range from 0 to 5.
   *
   * @defaultValue `2`- the gap-2 Bootstrap utility class will be applied.
   */
  paginationComponentSpacing?: number;
}

/**
 * Properties in the {@link GridPaginationModel} but not the
 * {@link PaginationModel}.
 *
 * @public
 */
export interface GridSpecificPaginationProperties {
  /**
   * Preset style options involving pagination UI components.
   *
   * @defaultValue `undefined` - All default values for the
   * {@link PaginationStyleOptions} interface will be applied.
   */
  styleOptions?: PaginationStyleOptions;
}

/**
 * Enables and configures pagination for the {@link Grid} component.
 *
 * @public
 */
export type GridPaginationModel = PaginationModel &
  GridSpecificPaginationProperties;
