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
 * A mapping of {@link ReactNode} for different toolbar tools.
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
 * Generates props for toolbar tool components based on a callback function
 * to close a tool.
 *
 * @internal
 */
export type InterfacePropGenerator = (
  closeUiCallback: () => void,
) => InterfaceParams;

/**
 * Injects a callback function to close toolbar tools into the {@link ReactNode}
 * for those tools.
 *
 * @internal
 */
export type InterfaceNodeGenerator = (
  closeUiCallback: () => void,
) => ToolbarInterfaces;
