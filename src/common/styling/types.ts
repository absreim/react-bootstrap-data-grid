import {
  AdditionalComponentsStyleModel,
  FilterInputTableStyleModel,
  TableStyleModel,
} from "@/table";

export interface ToolbarStyleModel {
  activeButton?: string[];
  inactiveButton?: string[];
  toolbar?: string[];
  interfaceContainer?: string[];
}

export interface ExportFormStyleModel {
  legend?: string[];
  radioContainer?: string[];
  radioInput?: string[];
  radioLabel?: string[];
  submitButton?: string[];
}

export interface StyleModel {
  mainTableStyleModel?: TableStyleModel;
  filterInputTableStyleModel?: FilterInputTableStyleModel;
  additionalComponentsStyleModel?: AdditionalComponentsStyleModel;
  toolbarStyleModel?: ToolbarStyleModel;
  exportFormStyleModel?: ExportFormStyleModel;
}
