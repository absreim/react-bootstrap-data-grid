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
  controlled: boolean;
};

const PaginationFeatureTestHarness: FC<PaginationFeatureTestHarnessProps> = ({
  rows,
  cols,
  initialPage,
  initialPageSizeIndex,
  pageSizeOptions,
  maxPageButtons,
  componentSize,
  controlled,
}) => {
  const [pageSizeIndex, setPageSizeIndex] = useState(initialPageSizeIndex);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const paginationState: GridPaginationState = useMemo(() => {
    if (controlled) {
      return {
        pageSizeOptions,
        pageSizeIndex,
        setPageSizeIndex,
        currentPage,
        setCurrentPage,
        maxPageButtons,
        componentSize,
      };
    }

    return {
      type: "uncontrolled",
      startingPageSizeIndex: initialPageSizeIndex,
      startingCurrentPage: initialPage,
      pageSizeOptions,
      maxPageButtons,
      componentSize,
    };
  }, [
    controlled,
    initialPageSizeIndex,
    initialPage,
    pageSizeOptions,
    maxPageButtons,
    componentSize,
    pageSizeIndex,
    currentPage,
  ]);

  return <Grid rows={rows} cols={cols} pagination={paginationState} />;
};

export default PaginationFeatureTestHarness;
