import { FC } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import { JustifyContentSetting } from "../types";
import { NormalizedPaginationModel } from "./types";

export interface PaginationProps {
  normalizedModel: NormalizedPaginationModel;
  prePagingNumRows: number;
  pageSelectorAriaLabel?: string; // aria-label of the nav element
  pageSelectorJustifyContent?: JustifyContentSetting;
}

const Pagination: FC<PaginationProps> = ({
  normalizedModel,
  prePagingNumRows
}) => {
  const {
    pageSizeOptions,
    pageSizeIndex,
    currentPage,
    setCurrentPage,
    setPageSizeIndex,
    componentSize,
    maxPageButtons,
    pageSelectorAriaLabel,
    pageSelectorJustifyContent
  } = normalizedModel;

  const numPages = Math.ceil(prePagingNumRows / pageSizeOptions[pageSizeIndex]);

  const pageIndexAwarePageSizeSetter: (pageSizeIndex: number) => void = (
    newPageSizeIndex,
  ) => {
    const newPageSize = pageSizeOptions[newPageSizeIndex];
    const maxPages = Math.ceil(prePagingNumRows / newPageSize);
    setPageSizeIndex(newPageSizeIndex);

    // The new page size can cause the current page number to be out of bounds.
    // In that case, set the page num to the maximum possible with new page
    // size.
    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
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
        setPageNum={setCurrentPage}
        size={componentSize}
        ariaLabel={pageSelectorAriaLabel}
        alignment={pageSelectorJustifyContent}
      />
    </div>
  );
};

export default Pagination;
