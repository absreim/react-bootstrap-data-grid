import {
  CellData,
  ColDef,
  FormattedRow,
  MainComponentSharedProps,
} from "../../common";
import { GridPaginationModel } from "../pagination/types";

/**
 * The type of the function used to specify color variants on a grid body on a
 * per-cell level of granularity.
 *
 * @param cell - details the current cell
 * @param row - details of the entire row that the current cell is in
 * @param colIndex - zero-based column index of the current cell
 * @param displayIndex - the zero-based index of the row that the cell is in.
 * The index is based on how the cell is actually displayed after pagination,
 * filtering, and sorting are applied.
 *
 * @returns - a string that is name of the color variant or null for no color
 * variant
 *
 * @public
 */
export type BodyCellVariantFn = (
  cell: CellData,
  row: FormattedRow,
  colIndex: number,
  displayIndex: number,
) => string | null;

/**
 * The type of the function used to specify color variants on a grid header on a
 * per-cell level of granularity.
 *
 * @param col - details of the column associated with the cell
 * @param colIndex - the zero-based column index of the cell
 *
 * @returns - a string that is name of the color variant or null for no color
 * variant
 *
 * @public
 */
export type HeaderCellVariantFn = (
  col: ColDef,
  colIndex: number,
) => string | null;

/**
 * The type of the props passed to the {@link Grid} component.
 *
 * @public
 */
export type GridProps = MainComponentSharedProps & GridSpecificProps;

/**
 * Props specific to the {@link Grid} and not the {@link Table}.
 *
 * @public
 */
export interface GridSpecificProps {
  /**
   * The height setting of the grid
   *
   * @defaultValue `"auto"`
   */
  height?: GridHeightSetting;

  /**
   * The width setting of the grid
   *
   * @defaultValue `"auto"`
   */
  width?: GridWidthSetting;

  /**
   * The grid-wide color variant
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  variant?: string;

  /**
   * The stripe setting of the grid
   *
   * @defaultValue `undefined` - no stripes will be present.
   */
  stripes?: GridStripeSetting;

  /**
   * Toggles hover styles for the grid
   *
   * @defaultValue `undefined` - no hover styles will be active.
   */
  hover?: boolean;

  /**
   * The border setting of the grid
   *
   * @defaultValue `undefined` - no borders will be shown.
   */
  borders?: GridBorderSetting;

  /**
   * The border color variant of the grid
   *
   * @defaultValue `undefined` - the default Bootstrap border color will be
   * used.
   */
  borderVariant?: string;

  /**
   * Toggles a denser grid style
   *
   * @defaultValue `false` - the grid will have the default density of cells
   * that are used in Bootstrap tables.
   */
  small?: boolean;

  /**
   * Toggles a horizontal divider between the grid header and body
   *
   * @defaultValue `false` - no divider will be shown.
   */
  divider?: boolean;

  /**
   * Sets the color variant of the header row
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  headerRowVariant?: string;

  /**
   * Function to set the color variant of header cells. Overrides the row-wide
   * setting when this function returns a non-null value.
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  headerCellVariant?: HeaderCellVariantFn;

  /**
   * Function to set the color variant of body rows
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  bodyRowVariant?: (row: FormattedRow, displayIndex: number) => string | null;

  /**
   * Function to set the color variant of body cells on a per-cell basis.
   * Overrides the row-wide setting when this function returns a non-null value.
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  bodyCellVariant?: BodyCellVariantFn;

  /**
   * Function to set the color variant of header cell focus rings
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  headerCellFocusVariant?: HeaderCellVariantFn;

  /**
   * Function to set the color variant of body cell focus rings
   *
   * @defaultValue `undefined` - no variant will be specified.
   */
  bodyCellFocusVariant?: BodyCellVariantFn;

  /**
   * Enables and configures pagination for the grid
   *
   * @defaultValue `undefined` - pagination will be disabled.
   */
  pagination?: GridPaginationModel;

  /**
   * Configures preset styles.
   *
   * @defaultValue `undefined` - default values for preset styles will be used.
   */
  styleOptions?: StyleOptions;
}

/**
 * The type of the prop to set grid height behavior
 *
 * - number: fixed height of grid in pixels
 * - `auto`: takes on the intrinsic height of the contents
 * - `parent`: takes on 100% of the parent height
 *
 * @public
 */
export type GridHeightSetting = number | "auto" | "parent";

/**
 * The type of the prop to set grid width behavior
 *
 * - number: fixed width of grid in pixels
 * - `auto`: takes on the intrinsic width of the contents
 * - `parent`: takes on 100% of the parent width
 *
 * @public
 */
export type GridWidthSetting = number | "auto" | "parent";

/**
 * The type of the prop to set the grid stripe style
 *
 * @public
 */
export type GridStripeSetting = "rows" | "columns" | "none";

/**
 * The type of the prop to set the grid border style
 *
 * @public
 */
export type GridBorderSetting = "horizontal" | "full" | "none";

/**
 * Object that contains preset style options for the {@link Grid} component.
 *
 * @public
 */
export interface StyleOptions {
  /**
   * Sets the amount of vertical spacing between the main grid component, the
   * toolbar, and pagination UI components. The number supplied to this
   * property will be used for the
   * {@link https://getbootstrap.com/docs/5.3/utilities/spacing/#gap | Bootstrap gap utility}.
   * Valid values depend on Bootstrap `$spacers` Sass map. Be default, the valid
   * values range from 0 to 5.
   *
   * @defaultValue `2`- the gap-2 Bootstrap utility class will be applied.
   */
  mainComponentSpacing?: number;
}
