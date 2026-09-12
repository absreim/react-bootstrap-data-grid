import { RowData, RowId } from "../types";

/**
 * Function that returns a callback function that responds to a row being
 * updated with the editing feature.
 *
 * @param id - the id of the row being updated
 * @param rowData - the contents of the edited row
 *
 * @public
 */
export type UpdateCallbackGenerator = (id: RowId) => (rowData: RowData) => void;

/**
 * Object that enables and configures the row editing feature.
 *
 * @public
 */
export interface EditModel {
  /**
   * Function that generates a callback function that responds to a row update.
   * Use this property to specify how row updates affect the state outside
   * the table component.
   */
  getUpdateCallback: UpdateCallbackGenerator;
  /**
   * Callback function for deleting rows via the UI. Omit this property or pass
   * undefined to disallow deletions via the UI.
   */
  getDeleteCallback?: (id: RowId) => () => void;
  /**
   * Specifies a fixed width in pixels for the column that contains the buttons
   * for editing a row. In particular, the min-width and max-width CSS
   * properties will be set.
   *
   * @defaultValue undefined - no CSS will be specified
   */
  editColWidth?: number;
}
