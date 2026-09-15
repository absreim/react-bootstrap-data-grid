import { RowId } from "../../common";
import { ReorderStyleModel } from "./types";

/**
 * Like the {@link ReorderModel}, but normalized with default values for
 * properties that are not specified.
 *
 * @internal
 */
export type ReorderStyles = Required<ReorderStyleModel>;

/**
 * Tracks the current source and destination when using a keyboard to reorder
 * rows.
 *
 * @internal
 */
export interface KeyboardReorderState {
  /**
   * The id of the source row.
   */
  rowId: RowId;
  /**
   * The current destination index.
   */
  destIndex: number;
}

/**
 * In addition to tracking the state of keyboard reordering UI like
 * {@link KeyboardReorderState} does, also provides functions to respond to
 * keystrokes.
 *
 * @internal
 */
export type ActiveKeyboardReorderState = KeyboardReorderState & {
  moveToPrevTarget: () => void;
  moveToNextTarget: () => void;
  clearState: () => void;
  drageeIndex: number;
};

/**
 * Output of the hook used to implement keyboard-based row reordering.
 *
 * @internal
 */
export interface UseKeyboardReorderOutput {
  /**
   * THe current state of the UI and functions to respond to keystrokes.
   */
  drageeState: ActiveKeyboardReorderState | null;
  /**
   * Function to set a new row as the one being moved.
   */
  setDragee: (rowId: RowId) => void;
}
