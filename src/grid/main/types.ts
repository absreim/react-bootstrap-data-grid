import {
  AugFormattedRow,
  ColDef,
  MainComponentSharedProps,
} from "@/common";

export type GridProps = MainComponentSharedProps & {
  height?: GridHeightSetting;
  width?: GridWidthSetting;
};

export type GridHeaderColInfo = Pick<ColDef, "label" | "name"> & {
  width: number;
};

export interface GridHeaderProps {
  colInfos: GridHeaderColInfo[];
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

export interface GridBodyProps {
  rowInfos: GridBodyRowInfo[];
}

export type UseGridInfos = GridHeaderProps & GridBodyProps;

export type GridHeightSetting = number | "auto" | "parent";
export type GridWidthSetting = number | "auto" | "parent";
