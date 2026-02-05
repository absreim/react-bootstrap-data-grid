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
  selectColTh?: string[];
  selectColTd?: (origIndex: number, displayIndex: number) => string[];
  selectInput?: (origIndex: number, displayIndex: number) => string[];
  editPrimaryButton?: string[];
  editSecondaryButton?: string[];
};

export type FilterInputTableStyleModel = SharedTableStyleModel & {
  tbodyTr?: (index: number) => string[];
  tbodyTd?: (index: number, colIndex: number) => string[];
  enablementInput?: string[];
  schemeSelectionInput?: string[];
  searchStringInput?: string[];
  numberInput?: string[];
  startDateInput?: string[];
  endDateInput?: string[];
  submitButton?: string[];
};

export interface AdditionalComponentsStyleModel {
  topLevelDiv?: string[];
  filterUiToggleButton?: string[];
}

export interface StyleModel {
  mainTableStyleModel?: TableStyleModel;
  filterInputTableStyleModel?: FilterInputTableStyleModel;
  additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
}
