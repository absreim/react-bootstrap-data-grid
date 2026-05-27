import { RowId } from "../";

export type ReorderCallback = (id: RowId, destIndex: number) => void;

export interface ReorderModel {
  callback: ReorderCallback;
}

export interface ReorderStyleModel {
  draggedRowClasses?: string[];
  draggedRowPredecessorClasses?: string[];
  topBorderRowClasses?: string[];
  bottomBorderRowClasses?: string[];
  ghostDivClasses?: string[];
}

export type ReorderStyles = Required<ReorderStyleModel>;
