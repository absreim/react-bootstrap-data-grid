import { ColSortModel } from "../common/sorting/internalTypes";
import { ColDefBase } from "../common";
import { TableProps } from "./types";

/**
 * All props that community and pro versions of the table have in common.
 *
 * @internal
 */
export type BaseTableProps = Omit<TableProps, "cols"> & {
  cols: ColDefBase[];
};

/**
 * Props for the ColHeaderCell component.
 *
 * @internal
 */
export interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[] | null;
  width?: number;
}
