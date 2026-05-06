import { RowId } from "../";

export type ReorderCallback = (id: RowId, destIndex: number) => void;

export interface ReorderModel {
  callback: ReorderCallback;
}
