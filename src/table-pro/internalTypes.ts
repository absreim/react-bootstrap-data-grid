import { ColHeaderCellProps } from "../table/internalTypes";
import { TableProps } from "../table";
import { ProColDef } from "./types";

/**
 * Props for the {@link ColHeaderCellPro} component.
 *
 * @internal
 */
export type ColHeaderCellProProps = ColHeaderCellProps &
  Pick<TableProps, "displayMode"> & {
    setWidth?: (width: number) => void;
  } & Pick<
    ProColDef,
    "minResizeWidth" | "maxResizeWidth" | "keyboardResizeStep"
  >;
