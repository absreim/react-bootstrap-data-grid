import { RowId } from "../";

export interface ReorderModel {
  callback: (id: RowId, destIndex: number) => void
}
