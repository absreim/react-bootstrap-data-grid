import {
  FilterState,
  NormalizedTableFilterModel,
} from "../../filtering/internalTypes";
import { ColDefBase, FormattedRow, RowDef } from "../../types";
import { SortedRowsOutput } from "./useSortedRows";
import { CurrentPageRowsOutput } from "./useCurrentPageRows";
import { TableProps } from "../../../table";

export type CombinedPipelineParams = Pick<
  TableProps,
  "rows" | "filterModel" | "sortModel" | "pagination" | "selectModel"
> & {
  cols: ColDefBase[];
};

export interface CombinedPipelineOutput {
  normalizedTableFilterModel: NormalizedTableFilterModel | null;
  filteredRows: RowDef[];
  filterState: FilterState | null;
  sortedRowsOutput: SortedRowsOutput;
  currentPageRowsOutput: CurrentPageRowsOutput;
  showSelectCol: boolean;
  ariaColIndexOffset: number;
  displayRows: FormattedRow[];
}
