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
}
