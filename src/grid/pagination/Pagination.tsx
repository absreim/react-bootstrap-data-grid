import { FC, useState } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import { JustifyContentSetting, Size } from "../types";
import { GridPaginationState } from "./types";

export interface PaginationProps {
  paginationState: GridPaginationState;
  prePagingNumRows: number;
  pageSelectorAriaLabel?: string; // aria-label of the nav element
  pageSelectorJustifyContent?: JustifyContentSetting;
}

const Pagination: FC<PaginationProps> = ({
  paginationState,
  prePagingNumRows,
  pageSelectorAriaLabel,
  pageSelectorJustifyContent,
}) => {
  const componentSize = paginationState.componentSize || "medium";
  const pageSizeOptions = paginationState.pageSizeOptions || [10, 25, 100];
  const [internalPageSizeIndex, setInternalPageSizeIndex] = useState<number>(
    paginationState.pageSizeIndex || 0,
  );
  const pageSizeIndex = paginationState.pageSizeIndex || internalPageSizeIndex;
  const handleSetPageSizeIndex =
    paginationState.setPageSizeIndex || setInternalPageSizeIndex;
  const [internalPageNum, setInternalPageNum] = useState<number>(paginationState.currentPage || 1);
  const currentPage = paginationState.currentPage || internalPageNum;
  const handleSetPageNum = paginationState.setCurrentPage || setInternalPageNum;
  const maxPageButtons = paginationState.maxPageButtons || 5;

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
        ariaLabel={pageSelectorAriaLabel}
        alignment={pageSelectorJustifyContent}
      />
    </div>
  );
};

export default Pagination;
