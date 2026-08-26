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

/**
 * Interface that contains parameters shared between the Table, TablePro, and
 * Grid components.
 *
 * @public
 */
export interface MainComponentSharedProps {
  /**
   * The rows of data to be displayed by the table or grid
   */
  rows: RowDef[];

  /**
   * The column definitions of the table or grid
   */
  cols: ColDef[];
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
