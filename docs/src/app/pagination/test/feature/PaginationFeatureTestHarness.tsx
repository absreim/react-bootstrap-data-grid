import { FC, useMemo, useState } from "react";
import Grid, { ColDef, GridPaginationState, RowDef } from "@/grid";

export type PaginationFeatureTestHarnessProps = Omit<
  GridPaginationState,
  "pageSizeIndex" | "setPageSizeIndex" | "currentPage" | "setCurrentPage"
> & {
  rows: RowDef[];
  cols: ColDef[];
  initialPageSizeIndex: number;
  initialPage: number;
};

const PaginationFeatureTestHarness: FC<PaginationFeatureTestHarnessProps> = ({
  rows,
  cols,
  initialPage,
  initialPageSizeIndex,
  pageSizeOptions,
  maxPageButtons,
  componentSize,
}) => {
  const [pageSizeIndex, setPageSizeIndex] = useState(initialPageSizeIndex);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const paginationState: GridPaginationState = useMemo(
    () => ({
      pageSizeOptions,
      pageSizeIndex,
      setPageSizeIndex,
      currentPage,
      setCurrentPage,
      maxPageButtons,
      componentSize,
    }),
    [
      pageSizeOptions,
      pageSizeIndex,
      currentPage,
      maxPageButtons,
      componentSize,
    ],
  );

  return <Grid rows={rows} cols={cols} pagination={paginationState} />;
};

export default PaginationFeatureTestHarness;
