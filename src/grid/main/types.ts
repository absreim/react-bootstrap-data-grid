import {
  AugCellData,
  AugFormattedRow,
  ColDef,
  MainComponentSharedProps,
} from "@/common";

export type GridProps = MainComponentSharedProps;

export type GridHeaderColInfo = Pick<ColDef, "label" | "name"> & {
  width: number;
};

export interface GridHeaderProps {
  colInfos: GridHeaderColInfo[];
}

export interface GridBodyCellInfo {
  formattedValue: string;
  width: number;
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
