import { ReactNode } from "react";
import { FilterOptionsTableProps } from "../filtering/FilterOptionsTable";
import { ExportFormProps } from "../export/ExportForm";

/**
 * Strings representing different tools on the toolbar.
 *
 * @internal
 */
export type ToolbarOption = "filtering" | "exporting";

/**
 * A mapping React elements for different toolbar tools.
 *
 * @internal
 */
export type ToolbarInterfaces = Partial<Record<ToolbarOption, ReactNode>>;

/**
 * Props to pass to the components that implement different tools.
 *
 * @internal
 */
export interface InterfaceParams {
  filtering?: FilterOptionsTableProps;
  exporting?: ExportFormProps;
}

/**
 * Defines props for toolbar tool UI React components while allowing the
 * callback to close the tool UI to be supplied later.
 *
 * @internal
 */
export type InterfacePropGenerator = (
  closeUiCallback: () => void,
) => InterfaceParams;

/**
 * Defines toolbar tool UI React elements while allowing the callback
 * to close the tool UI to be supplied later.
 *
 * @internal
 */
export type InterfaceNodeGenerator = (
  closeUiCallback: () => void,
) => ToolbarInterfaces;
