import { AugFormattedRow, ColDef, MainComponentSharedProps } from "@/common";
import { HTMLAttributes } from "react";

export type GridProps = MainComponentSharedProps & {
  height?: GridHeightSetting;
  width?: GridWidthSetting;
};

export type GridHeaderColInfo = Pick<ColDef, "label" | "name"> & {
  width: number;
};

export interface GridHeaderProps {
  colInfos: GridHeaderColInfo[];
  vertScrollable: boolean;
}

export interface GridBodyCellInfo {
  formattedValue: string;
  width: number;
  columnName: string; // to serve as the key since these are unique per row
}

export type GridBodyRowInfo = Pick<
  AugFormattedRow,
  "id" | "prePaginationIndex"
> & {
  cellInfos: GridBodyCellInfo[];
};

export type GridBodyProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  "className"
> & {
  rowInfos: GridBodyRowInfo[];
};

export type UseGridInfos = Omit<GridHeaderProps, "vertScrollable"> &
  GridBodyProps;

export type GridHeightSetting = number | "auto" | "parent";
export type GridWidthSetting = number | "auto" | "parent";
