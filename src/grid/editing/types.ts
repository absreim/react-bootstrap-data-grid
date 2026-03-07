import { ColDataType, ColDataTypeStrings, RowData, RowId } from "../types";

export interface CellData {
  fieldName: string;
  value: ColDataType;
  type: ColDataTypeStrings;
  ariaColIndex: number;
  formattedValue: string;
  label: string;
}

export type UpdateCallbackGenerator = (id: RowId) => (rowData: RowData) => void;

export interface EditModel {
  getUpdateCallback: UpdateCallbackGenerator;
  // undefined getDeleteCallback property means that deletion of rows is not permitted,
  // in which case the Delete button will not appear in the UI
  getDeleteCallback?: (id: RowId) => () => void;
}
