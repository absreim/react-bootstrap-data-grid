
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
  editPrimaryButton: tableStyleModel?.editPrimaryButton || [],
  editSecondaryButton: tableStyleModel?.editSecondaryButton || [],
  editColTh: tableStyleModel?.editColTh || [],
  editColTd: tableStyleModel?.editColTd ? tableStyleModel.editColTd : () => [],
  selectColTh: tableStyleModel?.selectColTh || [],
  selectColTd: tableStyleModel?.selectColTd
    ? tableStyleModel.selectColTd
    : () => [],
  selectInput: tableStyleModel?.selectInput
    ? tableStyleModel.selectInput
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
  enablementInput: filterTableStyleModel?.enablementInput || [],
  schemeSelectionInput: filterTableStyleModel?.schemeSelectionInput || [],
  searchStringInput: filterTableStyleModel?.searchStringInput || [],
  numberInput: filterTableStyleModel?.numberInput || [],
  startDateInput: filterTableStyleModel?.startDateInput || [],
  endDateInput: filterTableStyleModel?.endDateInput || [],
  submitButton: filterTableStyleModel?.submitButton || [],
});

export const unwrapAdditionalComponentsStyleModel: (
  styleModel: AdditionalComponentsStyleModel | undefined,
) => Required<AdditionalComponentsStyleModel> = (styleModel) => ({
  topLevelDiv: styleModel?.topLevelDiv || [],
  filterUiToggleButton: styleModel?.filterUiToggleButton || [],
});
