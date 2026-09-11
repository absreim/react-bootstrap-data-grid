import {
  AugFormattedRow,
  CellData,
  ColDef,
  FormattedRow,
  MainComponentSharedProps,
} from "../../common";
import { FocusCoordinates } from "../focus/types";

/**
 * The type of the function used to specify color variants on a grid body on a
 * per-cell level of granularity.
 *
 * @param cell - details the current cell
 * @param row - details of the entire row that the current cell is in
 * @param colIndex - zero-based column index of the current cell
 * @param displayIndex - the zero-based index of the row that the cell is in. The
 * index is based on how the cell is actually displayed, after pagination,
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
   */
  height?: GridHeightSetting;

  /**
   * The width setting of the grid
   */
  width?: GridWidthSetting;

  /**
   * The grid-wide color variant
   */
  variant?: string;

  /**
   * The stripe setting of the grid
   */
  stripes?: GridStripeSetting;

  /**
   * Toggles hover styles for the grid
   */
  hover?: boolean;

  /**
   * The border setting of the grid
   */
  borders?: GridBorderSetting;

  /**
   * The border color variant of the grid
   */
  borderVariant?: string;

  /**
   * Toggles a denser grid style
   */
  small?: boolean;

  /**
   * Toggles a horizontal divider between the grid header and body
   */
  divider?: boolean;

  /**
   * Sets the color variant of the header row
   */
  headerRowVariant?: string;

  /**
   * Function to set the color variant of header cells. Overrides the row-wide
   * setting when this function returns a non-null value.
   */
  headerCellVariant?: HeaderCellVariantFn;

  /**
   * Function to set the color variant of body rows
   */
  bodyRowVariant?: (row: FormattedRow, displayIndex: number) => string | null;

  /**
   * Function to set the color variant of body cells on a per-cell basis.
   * Overrides the row-wide setting when this function returns a non-null value.
   */
  bodyCellVariant?: BodyCellVariantFn;

  /**
   * Function to set the color variant of header cell focus rings
   */
  headerCellFocusVariant?: HeaderCellVariantFn;

  /**
   * Function to set the color variant of body cell focus rings
   */
  bodyCellFocusVariant?: BodyCellVariantFn;
}

/**
 * Props interface for the GridHeader component
 *
 * @internal
 */
export interface GridHeaderProps {
  cols: GridProps["cols"];
  vertScrollable: boolean;
  rowVariant?: GridProps["headerRowVariant"];
  cellVariant?: GridProps["headerCellVariant"];
  focusColIndex: number | null;
  cellFocusVariant?: GridProps["headerCellFocusVariant"];
}

/**
 * Props interface for the GridBody component
 *
 * @internal
 */
export type GridBodyProps = {
  augFormattedRows: AugFormattedRow[];
  cols: GridProps["cols"];
  rowVariant?: GridProps["bodyRowVariant"];
  cellVariant?: GridProps["bodyCellVariant"];
  focusCoords: FocusCoordinates;
  cellFocusVariant?: GridProps["bodyCellFocusVariant"];
};

/**
 * The type of the prop to set grid height behavior
 *
 * @public
 */
export type GridHeightSetting = number | "auto" | "parent";

/**
 * The type of the prop to set grid width behavior
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
