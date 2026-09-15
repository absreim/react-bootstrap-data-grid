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
