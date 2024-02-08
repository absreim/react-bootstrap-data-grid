type ColDataType = string | number | Date;
type ColDataTypeStrings = "string" | "number" | "date" | "datetime";

export interface ColDef {
  type: ColDataTypeStrings;
  name: string;
  label: string;
  formatter?: (value: any) => string;
}

export type RowDef = Record<string, ColDataType>;
