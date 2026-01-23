import { FC } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import { Size } from "../types";

export interface PaginationProps {
  componentSize: Size;
  pageSizeOptions: number[];
  pageSizeIndex: number;
  handleSetPageSizeIndex: (index: number) => void;
  handleSetPageNum: (index: number) => void;
  prePagingNumRows: number;
  maxPageButtons: number;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  componentSize,
  pageSizeOptions,
  pageSizeIndex,
  handleSetPageSizeIndex,
  handleSetPageNum,
  prePagingNumRows,
  maxPageButtons,
  currentPage,
}) => {
  const numPages = Math.ceil(prePagingNumRows / pageSizeOptions[pageSizeIndex]);

  const pageIndexAwarePageSizeSetter: (pageSizeIndex: number) => void = (
    newPageSizeIndex,
  ) => {
    const newPageSize = pageSizeOptions[newPageSizeIndex];
    const maxPages = Math.ceil(prePagingNumRows / newPageSize);
    handleSetPageSizeIndex(newPageSizeIndex);

    // The new page size can cause the current page number to be out of bounds.
    // In that case, set the page num to the maximum possible with new page
    // size.
    if (currentPage > maxPages) {
      handleSetPageNum(maxPages);
    }
  };

  return (
    <div className="d-flex justify-content-end gap-2">
      <PageSizeSelector
        componentSize={componentSize}
        pageSizeOptions={pageSizeOptions}
        pageSizeIndex={pageSizeIndex}
        handleSetPageSize={pageIndexAwarePageSizeSetter}
      />
      <PageSelector
        numPages={numPages}
        pageNum={currentPage}
        numButtons={maxPageButtons}
        setPageNum={handleSetPageNum}
        size={componentSize}
      />
    </div>
  );
};

export default Pagination;
