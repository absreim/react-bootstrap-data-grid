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

export interface KeyboardReorderState {
  rowId: RowId;
  destIndex: number;
}

export type ActiveKeyboardReorderState = KeyboardReorderState & {
  moveToPrevTarget: () => void;
  moveToNextTarget: () => void;
  clearState: () => void;
  drageeIndex: number;
};

export interface UseKeyboardReorderOutput {
  drageeState: ActiveKeyboardReorderState | null;
  setDragee: (rowId: RowId) => void;
}
