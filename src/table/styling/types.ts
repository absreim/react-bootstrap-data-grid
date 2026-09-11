import { RowId } from "../../common";

/**
 * Style model properties shared between the main table and the filter
 * options table.
 *
 * @public
 */
export interface SharedTableStyleModel {
  /**
   * Classes for the table element.
   */
  table?: string[];
  /**
   * Classes for the tbody element.
   */
  tbody?: string[];
  /**
   * Classes for the thead element.
   */
  thead?: string[];
  /**
   * Classes for the sole tr element inside the thead element.
   */
  theadTr?: string[];
  /**
   * Classes for the th elements within the thead element.
   */
  theadTh?: (colIndex: number) => string[] | null;
  /**
   * Classes for the caption element.
   */
  caption?: string[];
}

/**
 * Style model properties specific to the main table.
 *
 * @public
 */
export interface MainTableSpecificStyleModel {
  /**
   * Classes for tr elements within the tbody element.
   */
  tbodyTr?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for td elements within the tbody element.
   */
  tbodyTd?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[] | null;
  /**
   * Classes for input elements within the tbody element.
   */
  tbodyTdInput?: (
    rowId: RowId,
    displayRowIndex: number,
    colIndex: number,
  ) => string[] | null;
  /**
   * Classes for th element in the edit column.
   */
  editColTh?: string[];
  /**
   * Classes for the td elements in the edit column.
   */
  editColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the start button in the edit column.
   */
  editStartButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the delete button in the edit column.
   */
  editDeleteButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the save button in the edit column.
   */
  editSaveButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the cancel button in the edit column.
   */
  editCancelButton?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the th element of the row selection column.
   */
  rowSelectColTh?: string[];
  /**
   * Classes for the td elements of the row selection column.
   */
  rowSelectColTd?: (rowId: RowId, displayIndex: number) => string[] | null;
  /**
   * Classes for the input elements of the row selection column.
   */
  rowSelectInput?: (rowId: RowId, displayIndex: number) => string[] | null;
}

/**
 * Style model for the main table.
 *
 * @public
 */
export type TableStyleModel = SharedTableStyleModel &
  MainTableSpecificStyleModel;

/**
 * Style model properties specific to the filter inputs table.
 *
 * @public
 */
export interface FilterTableSpecificStyleModel {
  /**
   * Classes for the tr elements in the tbody element.
   */
  tbodyTr?: (rowIndex: number) => string[] | null;
  /**
   * Classes for the td elements in the tbody element.
   */
  tbodyTd?: (rowIndex: number, colIndex: number) => string[] | null;
  /**
   * Classes for the checkboxes that enable filtering for columns.
   */
  enablementInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for the dropdowns for selecting filter schemes.
   */
  schemeSelectionInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for text search string input elements.
   */
  searchStringInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for numerical input elements.
   */
  numberInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for the state date inputs.
   */
  startDateInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for the end date inputs.
   */
  endDateInput?: (rowIndex: number) => string[] | null;
  /**
   * Classes for the form submit button.
   */
  submitButton?: string[];
  /**
   * Classes for the form element.
   */
  form?: string[];
}

/**
 * Style model for the filter inputs table.
 *
 * @public
 */
export type FilterInputTableStyleModel = SharedTableStyleModel &
  FilterTableSpecificStyleModel;

/**
 * Style model for components that are not included in other categories.
 *
 * @public
 */
export interface AdditionalComponentsStyleModel {
  topLevelDiv?: string[];
  tableAndPaginationDiv?: string[];
  tableDiv?: string[];
  paginationUiDiv?: string[];
}
