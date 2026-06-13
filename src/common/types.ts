import { EditModel } from "./editing/types";
import { PaginationModel } from "./pagination/types";
import { SortModel } from "./sorting/types";
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
export type ValidRowData = Record<string, any>;
export type RowData<Data extends ValidRowData = ValidRowData> = Data;
export type RowId = string | number;

export interface RowDef<Data extends ValidRowData = ValidRowData> {
  id: RowId;
  data: RowData<Data>;
}

export interface MainComponentSharedProps {
  rows: RowDef[];
  cols: ColDef[];
  pagination?: PaginationModel;
  sortModel?: SortModel;
  filterModel?: FilterModel;
  selectModel?: SelectModel;
  editModel?: EditModel;
  styleModel?: StyleModel;
  allowExport?: boolean;
}

export type AugRowDef<Data extends ValidRowData = ValidRowData> =
  RowDef<Data> & {
    origIndex: number;
  };

export type PostPaginationRowDef<Data extends ValidRowData = ValidRowData> =
  AugRowDef<Data> & {
    prePaginationIndex: number;
  };

export interface CellData {
  fieldName: string;
  value: ColDataType;
  type: ColDataTypeStrings;
  ariaColIndex: number;
  formattedValue: string;
  label: string;
  width?: number;
}

export type FormattedRow = {
  contents: Omit<CellData, "width">[];
} & Omit<PostPaginationRowDef, "data">;

export type AugFormattedRow = {
  contents: CellData[];
} & Omit<PostPaginationRowDef, "data">;
