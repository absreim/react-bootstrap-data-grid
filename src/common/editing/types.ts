import { RowData, RowId } from "@/common/types";

export type UpdateCallbackGenerator = (id: RowId) => (rowData: RowData) => void;

export interface EditModel {
  getUpdateCallback: UpdateCallbackGenerator;
  // undefined getDeleteCallback property means that deletion of rows is not permitted,
  // in which case the Delete button will not appear in the UI
  getDeleteCallback?: (id: RowId) => () => void;
  editColWidth?: number;
}