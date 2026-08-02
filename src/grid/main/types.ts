import {
  AugFormattedRow,
  CellData,
  ColDef,
  FormattedRow,
  MainComponentSharedProps,
} from "../../common";
import { FocusCoordinates } from "../focus/types";

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
  headerCellVariant?: (col: ColDef, colIndex: number) => string | null;
  bodyRowVariant?: (row: FormattedRow, displayIndex: number) => string | null;
  bodyCellVariant?: (
    cell: CellData,
    row: FormattedRow,
    colIndex: number,
    displayIndex: number,
  ) => string | null;
};

export interface GridHeaderProps {
  cols: GridProps["cols"];
  vertScrollable: boolean;
  rowVariant?: GridProps["headerRowVariant"];
  cellVariant?: GridProps["headerCellVariant"];
  focusColIndex: number | null;
}

export type GridBodyProps = {
  augFormattedRows: AugFormattedRow[];
  cols: GridProps["cols"];
  rowVariant?: GridProps["bodyRowVariant"];
  cellVariant?: GridProps["bodyCellVariant"];
  focusCoords: FocusCoordinates;
};

export type GridHeightSetting = number | "auto" | "parent";
export type GridWidthSetting = number | "auto" | "parent";
export type GridStripeSetting = "rows" | "columns" | "none";
export type GridBorderSetting = "horizontal" | "full" | "none";
