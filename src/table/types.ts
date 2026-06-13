import { ColSortModel } from "../common/sorting/types";
import { ColDefBase, MainComponentSharedProps } from "../common/types";
import { StyleModel } from "../common/styling/types";

export type DisplayMode = "table" | "block";

export type TableProps = MainComponentSharedProps & {
  caption?: string;
  styleModel?: StyleModel;
  displayMode?: DisplayMode;
};

// All props that community and pro versions have in common
export type BaseTableProps = Omit<TableProps, "cols"> & {
  cols: ColDefBase[];
};

export interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[] | null;
  width?: number;
}
