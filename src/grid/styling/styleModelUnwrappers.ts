import {
  AdditionalComponentsStyleModel,
  FilterInputTableStyleModel,
  SharedTableStyleModel,
  TableStyleModel,
} from "./types";

const unwrapSharedStyleModel: (
  sharedStyleModel: SharedTableStyleModel | undefined,
) => Required<SharedTableStyleModel> = (sharedStyleModel) => ({
  table: sharedStyleModel?.table || [],
  tbody: sharedStyleModel?.tbody || [],
  thead: sharedStyleModel?.thead || [],
  theadTr: sharedStyleModel?.theadTr || [],
  theadTh: sharedStyleModel?.theadTh ? sharedStyleModel.theadTh : () => [],
  caption: sharedStyleModel?.caption || [],
});

export const unwrapTableStyleModel: (
  tableStyleModel: TableStyleModel | undefined,
) => Required<TableStyleModel> = (tableStyleModel) => ({
  ...unwrapSharedStyleModel(tableStyleModel),
  tbodyTr: tableStyleModel?.tbodyTr ? tableStyleModel.tbodyTr : () => [],
  tbodyTd: tableStyleModel?.tbodyTd ? tableStyleModel.tbodyTd : () => [],
  tbodyTdInput: tableStyleModel?.tbodyTdInput
    ? tableStyleModel.tbodyTdInput
    : () => [],
  editColTh: tableStyleModel?.editColTh || [],
  editColTd: tableStyleModel?.editColTd ? tableStyleModel.editColTd : () => [],
  editCancelButton: tableStyleModel?.editCancelButton
    ? tableStyleModel.editCancelButton
    : () => [],
  editDeleteButton: tableStyleModel?.editDeleteButton
    ? tableStyleModel.editDeleteButton
    : () => [],
  editSaveButton: tableStyleModel?.editSaveButton
    ? tableStyleModel.editSaveButton
    : () => [],
  editStartButton: tableStyleModel?.editStartButton
    ? tableStyleModel.editStartButton
    : () => [],
  rowSelectColTh: tableStyleModel?.rowSelectColTh || [],
  rowSelectColTd: tableStyleModel?.rowSelectColTd
    ? tableStyleModel.rowSelectColTd
    : () => [],
  rowSelectInput: tableStyleModel?.rowSelectInput
    ? tableStyleModel.rowSelectInput
    : () => [],
});

export const unwrapFilterInputTableStyleModel: (
  filterTableStyleModel: FilterInputTableStyleModel | undefined,
) => Required<FilterInputTableStyleModel> = (filterTableStyleModel) => ({
  ...unwrapSharedStyleModel(filterTableStyleModel),
  tbodyTr: filterTableStyleModel?.tbodyTr
    ? filterTableStyleModel.tbodyTr
    : () => [],
  tbodyTd: filterTableStyleModel?.tbodyTd
    ? filterTableStyleModel.tbodyTd
    : () => [],
  enablementInput: filterTableStyleModel?.enablementInput
    ? filterTableStyleModel.enablementInput
    : () => [],
  schemeSelectionInput: filterTableStyleModel?.schemeSelectionInput
    ? filterTableStyleModel.schemeSelectionInput
    : () => [],
  searchStringInput: filterTableStyleModel?.searchStringInput
    ? filterTableStyleModel.searchStringInput
    : () => [],
  numberInput: filterTableStyleModel?.numberInput
    ? filterTableStyleModel.numberInput
    : () => [],
  startDateInput: filterTableStyleModel?.startDateInput
    ? filterTableStyleModel.startDateInput
    : () => [],
  endDateInput: filterTableStyleModel?.endDateInput
    ? filterTableStyleModel.endDateInput
    : () => [],
  submitButton: filterTableStyleModel?.submitButton || [],
});

export const unwrapAdditionalComponentsStyleModel: (
  styleModel: AdditionalComponentsStyleModel | undefined,
) => Required<AdditionalComponentsStyleModel> = (styleModel) => ({
  topLevelDiv: styleModel?.topLevelDiv || [],
  filterInputsDiv: styleModel?.filterInputsDiv || [],
  tableAndPaginationDiv: styleModel?.tableAndPaginationDiv || [],
  filterUiToggleButton: styleModel?.filterUiToggleButton || [],
});
