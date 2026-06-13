import { ReactNode } from "react";
import { FilterOptionsTableProps } from "../filtering/FilterOptionsTable";
import { ExportFormProps } from "../export/ExportForm";

export type ToolbarOption = "filtering" | "exporting";

export type ToolbarInterfaces = Partial<Record<ToolbarOption, ReactNode>>;

export interface InterfaceParams {
  filtering?: FilterOptionsTableProps;
  exporting?: ExportFormProps;
}

export type InterfacePropGenerator = (
  closeUiCallback: () => void,
) => InterfaceParams;

export type InterfaceNodeGenerator = (
  closeUiCallback: () => void,
) => ToolbarInterfaces;
