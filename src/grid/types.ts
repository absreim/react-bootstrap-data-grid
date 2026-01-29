import { CellData } from "./editing/types";

export type ColDataType = string | number | Date;
export type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: any) => string;
  sortable?: boolean; // default false
}

export type RowDef = Record<string, ColDataType>;

export interface RowMetadata {
  origIndex: number;
}

export interface AugRowDef {
  data: RowDef;
  meta: RowMetadata;
}

export interface FormattedRow {
  contents: CellData[];
  origIndex: number;
}

export type JustifyContentSetting =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type Size = "small" | "medium" | "large";
