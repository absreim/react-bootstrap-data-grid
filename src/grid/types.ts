import { CellData, EditModel } from "./editing/types";
import { GridPaginationState } from "./pagination/types";
import { ColSortModel, TableSortModel } from "./sorting/types";
import { FilterModel } from "./filtering/types";
import { SelectModel } from "./selection/types";
import { StyleModel } from "./styling/types";

export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDefBase<ValueType = any> {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: ValueType) => string;
  sortable?: boolean; // default false
}

export type ColDef<ValueType = any> = ColDefBase<ValueType> & {
  width?: number;
};

type ValidRowData = Record<string, any>;

export type RowData<Data extends ValidRowData = ValidRowData> = Data;

export type RowId = string | number;

export interface RowDef<Data extends ValidRowData = ValidRowData> {
  id: RowId;
  data: RowData<Data>;
}

export interface FormattedRow {
  contents: CellData[];
  id: RowId;
}

export type AugCellData = CellData & {
  width?: number;
}

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

export interface GridProps {
  rows: RowDef[];
  cols: ColDef[];
  pagination?: GridPaginationState;
  sortModel?: TableSortModel;
  filterModel?: FilterModel;
  selectModel?: SelectModel;
  editModel?: EditModel;
  caption?: string;
  styleModel?: StyleModel;
  useToolbar?: boolean;
  responsive?: boolean;
  displayMode?: DisplayMode;
}

// All props that community and pro versions have in common
export type BaseGridProps = Omit<GridProps, "cols"> & {
  cols: ColDefBase[];
};

export interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[];
  width?: number;
}
