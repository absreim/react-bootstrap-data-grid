import {
  AugFormattedRow,
  CellData,
  ColDef,
  FormattedRow,
  MainComponentSharedProps,
} from "@/common";

export type GridProps = MainComponentSharedProps & {
  height?: GridHeightSetting;
  width?: GridWidthSetting;
  variant?: string;
  stripes?: GridStripeSetting;
  hover?: boolean;
  borders?: GridBorderSetting;
  borderColorVariant?: string;
  small?: boolean;
  divider?: boolean;
  headerRowVariant?: string;
  headerCellVariant?: (col: ColDef) => string | null;
  bodyRowVariant?: (row: FormattedRow) => string | null;
  bodyCellVariant?: (cell: CellData, row: FormattedRow) => string | null;
};

export interface GridHeaderProps {
  cols: GridProps["cols"];
  vertScrollable: boolean;
  rowVariant?: GridProps["headerRowVariant"];
  cellVariant?: GridProps["headerCellVariant"];
}

export type GridBodyProps = Pick<GridProps, "divider"> & {
  augFormattedRows: AugFormattedRow[];
  cols: GridProps["cols"];
  rowVariant?: GridProps["bodyRowVariant"];
  cellVariant?: GridProps["bodyCellVariant"];
};

export type GridHeightSetting = number | "auto" | "parent";
export type GridWidthSetting = number | "auto" | "parent";
export type GridStripeSetting = "rows" | "columns" | "none";
export type GridBorderSetting = "horizontal" | "full" | "none";
