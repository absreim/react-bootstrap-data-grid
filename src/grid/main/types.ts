import {
  AugFormattedRow,
  CellData,
  ColDef,
  FormattedRow,
  MainComponentSharedProps,
} from "../../common";
import { FocusCoordinates } from "../focus/types";

export type BodyCellVariantFn = (
  cell: CellData,
  row: FormattedRow,
  colIndex: number,
  displayIndex: number,
) => string | null;

export type HeaderCellVariantFn = (
  col: ColDef,
  colIndex: number,
) => string | null;

export type GridProps = MainComponentSharedProps & {
  height?: GridHeightSetting;
  width?: GridWidthSetting;
  variant?: string;
  stripes?: GridStripeSetting;
  hover?: boolean;
  borders?: GridBorderSetting;
  borderVariant?: string;
  small?: boolean;
  divider?: boolean;
  headerRowVariant?: string;
  headerCellVariant?: HeaderCellVariantFn;
  bodyRowVariant?: (row: FormattedRow, displayIndex: number) => string | null;
  bodyCellVariant?: BodyCellVariantFn;
  headerCellFocusVariant?: HeaderCellVariantFn;
  bodyCellFocusVariant?: BodyCellVariantFn;
};

export interface GridHeaderProps {
  cols: GridProps["cols"];
  vertScrollable: boolean;
  rowVariant?: GridProps["headerRowVariant"];
  cellVariant?: GridProps["headerCellVariant"];
  focusColIndex: number | null;
  cellFocusVariant?: GridProps["headerCellFocusVariant"];
}

export type GridBodyProps = {
  augFormattedRows: AugFormattedRow[];
  cols: GridProps["cols"];
  rowVariant?: GridProps["bodyRowVariant"];
  cellVariant?: GridProps["bodyCellVariant"];
  focusCoords: FocusCoordinates;
  cellFocusVariant?: GridProps["bodyCellFocusVariant"];
};

export type GridHeightSetting = number | "auto" | "parent";
export type GridWidthSetting = number | "auto" | "parent";
export type GridStripeSetting = "rows" | "columns" | "none";
export type GridBorderSetting = "horizontal" | "full" | "none";
