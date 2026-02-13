export interface SharedTableStyleModel {
  table?: string[];
  tbody?: string[];
  thead?: string[];
  theadTr?: string[];
  theadTh?: (colIndex: number) => string[];
  caption?: string[];
}

export type TableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (origIndex: number, displayIndex: number) => string[];
  tbodyTd?: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  tbodyTdInput?: (
    origRowIndex: number,
    displayRowIndex: number,
    colIndex: number,
  ) => string[];
  editColTh?: string[];
  editColTd?: (origIndex: number, displayIndex: number) => string[];
  editStartButton?: (origIndex: number, displayIndex: number) => string[];
  editDeleteButton?: (origIndex: number, displayIndex: number) => string[];
  editSaveButton?: (origIndex: number, displayIndex: number) => string[];
  editCancelButton?: (origIndex: number, displayIndex: number) => string[];
  rowSelectColTh?: string[];
  rowSelectColTd?: (origIndex: number, displayIndex: number) => string[];
  rowSelectInput?: (origIndex: number, displayIndex: number) => string[];
};

export type FilterInputTableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (rowIndex: number) => string[];
  tbodyTd?: (rowIndex: number, colIndex: number) => string[];
  enablementInput?: (rowIndex: number) => string[];
  schemeSelectionInput?: (rowIndex: number) => string[];
  searchStringInput?: (rowIndex: number) => string[];
  numberInput?: (rowIndex: number) => string[];
  startDateInput?: (rowIndex: number) => string[];
  endDateInput?: (rowIndex: number) => string[];
  submitButton?: string[];
};

export interface AdditionalComponentsStyleModel {
  topLevelDiv?: string[];
  filterInputsDiv?: string[];
  tableAndPaginationDiv?: string[];
  filterUiToggleButton?: string[];
}

export interface StyleModel {
  mainTableStyleModel?: TableStyleModel;
  filterInputTableStyleModel?: FilterInputTableStyleModel;
  additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
}
