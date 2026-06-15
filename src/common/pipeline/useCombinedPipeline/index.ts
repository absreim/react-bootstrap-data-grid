import useFilterStateStore from "./useFilterStateStore";
import useFilter from "./useFilter";
import useFilterStateFromEditable from "./useFilterStateFromEditable";
import useSortedRows, { SortedRowsOutput } from "./useSortedRows";
import useCurrentPageRows, {
  CurrentPageRowsOutput,
} from "./useCurrentPageRows";
import { TableProps } from "../../../table/types";
import useDisplayRows from "./useDisplayRows";
import {
  NormalizedTableFilterModel,
  TableFilterState,
} from "@/common/filtering/types";
import { ColDefBase, FormattedRow, RowDef } from "../../types";

export type CombinedPipelineParams = Pick<
  TableProps,
  "rows" | "filterModel" | "sortModel" | "pagination" | "selectModel"
> & {
  cols: ColDefBase[];
};

export interface UseCombinedPipelineHook {
  normalizedTableFilterModel: NormalizedTableFilterModel | null;
  filteredRows: RowDef[];
  filterState: TableFilterState | null;
  sortedRowsOutput: SortedRowsOutput;
  currentPageRowsOutput: CurrentPageRowsOutput;
  showSelectCol: boolean;
  ariaColIndexOffset: number;
  displayRows: FormattedRow[];
}

const useCombinedPipeline: (
  params: CombinedPipelineParams,
) => UseCombinedPipelineHook = ({
  filterModel,
  cols,
  rows,
  sortModel,
  pagination,
  selectModel,
}) => {
  const normalizedTableFilterModel = useFilterStateStore(filterModel, cols);
  const editableFilterState =
    normalizedTableFilterModel?.tableFilterState || null;
  const filteredRows = useFilter(rows, editableFilterState);
  const filterState = useFilterStateFromEditable(cols, editableFilterState);

  const sortedRowsOutput = useSortedRows(filteredRows, cols, sortModel);
  const { sortedRows } = sortedRowsOutput;
  const currentPageRowsOutput = useCurrentPageRows(sortedRows, pagination);

  const showSelectCol = !!(selectModel && selectModel.mode !== "row");
  const ariaColIndexOffset = showSelectCol ? 1 : 0;
  const { paginatedRows } = currentPageRowsOutput;
  const displayRows: FormattedRow[] = useDisplayRows(
    paginatedRows,
    cols,
    ariaColIndexOffset,
  );

  return {
    normalizedTableFilterModel,
    filteredRows,
    filterState,
    sortedRowsOutput,
    currentPageRowsOutput,
    showSelectCol,
    ariaColIndexOffset,
    displayRows,
  };
};

export default useCombinedPipeline;
