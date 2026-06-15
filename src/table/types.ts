import { PaginationModel } from "../common/pagination/types";
import { ColSortModel, TableSortModel } from "../common/sorting/types";
import { FilterModel } from "../common/filtering/types";
import { SelectModel } from "./selection/types";
import {
  ColDefBase,
  MainComponentSharedProps,
  RowDef,
  ValidRowData,
} from "../common/types";
import { CellData, EditModel } from "../common/editing/types";
import { StyleModel } from "../common/styling/types";

export type AugRowDef<Data extends ValidRowData = ValidRowData> =
  RowDef<Data> & {
    origIndex: number;
  };

export type PostPaginationRowDef<Data extends ValidRowData = ValidRowData> =
  AugRowDef<Data> & {
    prePaginationIndex: number;
  };

export type FormattedRow = {
  contents: CellData[];
} & Omit<PostPaginationRowDef, "data">;

export type AugCellData = CellData & {
  width?: number;
};

export type AugFormattedRow = Omit<FormattedRow, "contents"> & {
  contents: AugCellData[];
};

export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type Size = "small" | "medium" | "large";

export type DisplayMode = "table" | "block";

export type TableProps = MainComponentSharedProps & {
  pagination?: PaginationModel;
  sortModel?: TableSortModel;
  filterModel?: FilterModel;
  selectModel?: SelectModel;
  editModel?: EditModel;
  caption?: string;
  styleModel?: StyleModel;
  displayMode?: DisplayMode;
  allowExport?: boolean;
}

// All props that community and pro versions have in common
export type BaseGridProps = Omit<TableProps, "cols"> & {
  cols: ColDefBase[];
};

export interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[] | null;
  width?: number;
}
