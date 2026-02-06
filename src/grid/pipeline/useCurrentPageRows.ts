import { useMemo } from "react";
import { AugRowDef } from "../types";
import { GridPaginationState } from "../pagination/types";

const useCurrentPageRows: (
  sortedRows: AugRowDef[],
  pagination: GridPaginationState | undefined,
) => AugRowDef[] = (sortedRows, pagination) =>
  useMemo(() => {
    if (pagination === undefined) {
      return sortedRows;
    }

    const { pageSizeOptions, pageSizeIndex, currentPage } = pagination;
    const pageSize = pageSizeOptions[pageSizeIndex];
    const lowerIndex = pageSize * (currentPage - 1);
    const upperIndex = lowerIndex + pageSize;
    return sortedRows.slice(lowerIndex, upperIndex);
  }, [sortedRows, pagination]);

export default useCurrentPageRows;
