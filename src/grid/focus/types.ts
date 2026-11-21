/**
 * Grid cell coordinates based on ARIA row index and column index.
 *
 * @public
 */
export interface FocusCoordinates {
  /**
   * An index like ARIA row index, except that it is based on the actual
   * position of the row. When pagination is enabled, this value can differ from
   * the ARIA row index.
   */
  displayRowIndex: number;

  /**
   * The ARIA column index.
   */
  ariaColIndex: number;
}
