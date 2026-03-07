import { FC, useState } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import { JustifyContentSetting, Size } from "../types";
import { PaginationModel } from "./types";

export interface PaginationProps {
  paginationModel: PaginationModel;
  prePagingNumRows: number;
  pageSelectorAriaLabel?: string; // aria-label of the nav element
  pageSelectorJustifyContent?: JustifyContentSetting;
}

const Pagination: FC<PaginationProps> = ({
  paginationModel,
  prePagingNumRows,
  pageSelectorAriaLabel,
  pageSelectorJustifyContent,
}) => {
  const componentSize = paginationModel.componentSize || "medium";
  const pageSizeOptions = paginationModel.pageSizeOptions || [10, 25, 100];
  const isControlled = paginationModel.type !== "uncontrolled";
  const [internalPageSizeIndex, setInternalPageSizeIndex] = useState<number>(
    isControlled ? 0 : paginationModel.startingPageSizeIndex || 0,
  );
  const pageSizeIndex = isControlled
    ? paginationModel.pageSizeIndex
    : internalPageSizeIndex;
  const handleSetPageSizeIndex = isControlled
    ? paginationModel.setPageSizeIndex
    : setInternalPageSizeIndex;
  const [internalPageNum, setInternalPageNum] = useState<number>(
    isControlled ? 1 : paginationModel.startingCurrentPage || 1,
  );
  const currentPage = isControlled
    ? paginationModel.currentPage
    : internalPageNum;
  const handleSetPageNum = isControlled
    ? paginationModel.setCurrentPage
    : setInternalPageNum;
  const maxPageButtons = paginationModel.maxPageButtons || 5;

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
