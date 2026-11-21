import useFilterStateStore from "./useFilterStateStore";
import useFilter from "./useFilter";
import useFilterStateFromEditable from "./useFilterStateFromEditable";
import useSortedRows from "./useSortedRows";
import useCurrentPageRows from "./useCurrentPageRows";
import useDisplayRows from "./useDisplayRows";
import { FormattedRow } from "../../types";
import {
  CombinedPipelineOutput,
  CombinedPipelineParams,
} from "./internalTypes";

const useCombinedPipeline: (
  params: CombinedPipelineParams,
) => CombinedPipelineOutput = ({
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
