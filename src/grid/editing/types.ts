import { ColDataType, ColDataTypeStrings, RowDef } from "../types";

export interface CellData {
  fieldName: string;
  value: ColDataType;
  type: ColDataTypeStrings;
  ariaColIndex: number;
  formattedValue: string;
  label: string;
}

export type UpdateCallbackGenerator = (
  origIndex: number,
) => (rowDef: RowDef) => void;

export interface EditModel {
  getUpdateCallback: UpdateCallbackGenerator;
  // undefined getDeleteCallback property means that deletion of rows is not permitted,
  // in which case the Delete button will not appear in the UI
  getDeleteCallback?: (origIndex: number) => () => void;
}
