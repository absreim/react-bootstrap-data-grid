import { useMemo, useState } from "react";
import { RowDef } from "../../types";
import {
  NormalizedPaginationModel,
  GridPaginationState,
} from "../../pagination/types";

export interface CurrentPageRowsOutput {
  paginatedRows: RowDef[];
  normalizedModel: NormalizedPaginationModel | null;
}

const useCurrentPageRows: (
  sortedRows: RowDef[],
  paginationModel: GridPaginationState | undefined,
) => CurrentPageRowsOutput = (sortedRows, paginationModel) => {
  const componentSize = paginationModel?.componentSize || "medium";
  const isControlled = paginationModel?.type !== "uncontrolled";
  const [internalPageSizeIndex, setInternalPageSizeIndex] = useState<number>(
    isControlled ? 0 : paginationModel.startingPageSizeIndex || 0,
  );
  const pageSizeIndex = isControlled
    ? paginationModel?.pageSizeIndex || 0
    : internalPageSizeIndex;
  const setPageSizeIndex = isControlled
    ? paginationModel?.setPageSizeIndex
    : setInternalPageSizeIndex;
  const [internalPageNum, setInternalPageNum] = useState<number>(
    isControlled ? 1 : paginationModel.startingCurrentPage || 1,
  );
  const currentPage = isControlled
    ? paginationModel?.currentPage || 1
    : internalPageNum;
  const setCurrentPage = isControlled
    ? paginationModel?.setCurrentPage
    : setInternalPageNum;
  const maxPageButtons = paginationModel?.maxPageButtons || 5;

  return useMemo(() => {
    if (paginationModel === undefined) {
      return { paginatedRows: sortedRows, normalizedModel: null };
    }

    const pageSizeOptions = paginationModel?.pageSizeOptions || [10, 25, 100];
    const normalizedModel: NormalizedPaginationModel = {
      pageSizeIndex,
      setPageSizeIndex: setPageSizeIndex!,
      currentPage,
      setCurrentPage: setCurrentPage!,
      pageSizeOptions,
      maxPageButtons,
      componentSize,
      pageSelectorAriaLabel: paginationModel?.pageSelectorAriaLabel,
      pageSelectorJustifyContent: paginationModel?.pageSelectorJustifyContent,
    };

    const pageSize = pageSizeOptions[pageSizeIndex];
    const lowerIndex = pageSize * (currentPage - 1);
    const upperIndex = lowerIndex + pageSize;
    const paginatedRows = sortedRows.slice(lowerIndex, upperIndex);

    return { paginatedRows, normalizedModel };
  }, [
    paginationModel,
    pageSizeIndex,
    setPageSizeIndex,
    currentPage,
    setCurrentPage,
    maxPageButtons,
    componentSize,
    sortedRows,
  ]);
};

export default useCurrentPageRows;
