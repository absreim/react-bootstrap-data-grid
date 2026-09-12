import { RowId } from "../";

/**
 * Type of the callback function to respond to a reorder operation.
 *
 * @param id - the id of the source row
 * @param destIndex - the index of the destination row
 *
 * @public
 */
export type ReorderCallback = (id: RowId, destIndex: number) => void;

/**
 * Object that enables the row reordering feature.
 *
 * @public
 */
export interface ReorderModel {
  /**
   * Callback function called when a reorder operation is performed via the UI.
   */
  callback: ReorderCallback;
}

/**
 * Style model properties specific to the row reordering feature.
 *
 * @public
 */
export interface ReorderStyleModel {
  /**
   * Classes for the row being dragged.
   */
  draggedRowClasses?: string[];
  /**
   * Classes for the row above the row being dragged.
   */
  draggedRowPredecessorClasses?: string[];
  /**
   * Classes for the row below the drag destination.
   */
  topBorderRowClasses?: string[];
  /**
   * Classes for the row above the drag destination.
   */
  bottomBorderRowClasses?: string[];
  /**
   * Classes for the drag marker that follows the cursor while dragging.
   */
  ghostDivClasses?: string[];
}

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
