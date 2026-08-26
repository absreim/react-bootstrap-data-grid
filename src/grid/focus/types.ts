/**
 * Grid cell coordinates based on ARIA row index and column index.
 * @public
 */
export interface FocusCoordinates {
  /**
   * The ARIA row index
   */
  ariaRowIndex: number;

  /**
   * The ARIA column index
   */
  ariaColIndex: number;
}
