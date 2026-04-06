import { CellData } from "./editing/types";

export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef<ValueType = any> {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: ValueType) => string;
  sortable?: boolean; // default false
  width?: number;
}

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

export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type Size = "small" | "medium" | "large";

export type DisplayMode = "table" | "block";
