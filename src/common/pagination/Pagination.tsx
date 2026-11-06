import { FC } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import classNames from "classnames";
import { NormalizedPaginationModel } from "./internalTypes";

export interface PaginationProps {
  normalizedModel: NormalizedPaginationModel;
  prePagingNumRows: number;
  containerDivClasses?: string[];
  sizeSelectAfterPageSelect?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  normalizedModel,
  prePagingNumRows,
  containerDivClasses,
  sizeSelectAfterPageSelect,
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
    pageSelectorJustifyContent,
    showTextLabel,
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

  const pageSizeSelect = (
    <PageSizeSelector
      componentSize={componentSize}
      pageSizeOptions={pageSizeOptions}
      pageSizeIndex={pageSizeIndex}
      handleSetPageSize={pageIndexAwarePageSizeSetter}
      showTextLabel={!!showTextLabel}
    />
  );
  const pageSelect = (
    <PageSelector
      numPages={numPages}
      pageNum={currentPage}
      numButtons={maxPageButtons}
      setPageNum={setCurrentPage}
      size={componentSize}
      ariaLabel={pageSelectorAriaLabel}
      alignment={pageSelectorJustifyContent}
    />
  );

  return (
    <div
      data-testid="rdbg-pagination-ui-container"
      className={classNames(
        containerDivClasses || [
          "d-flex",
          "justify-content-end",
          "gap-2",
          "px-2",
        ],
      )}
    >
      {sizeSelectAfterPageSelect ? (
        <>
          {pageSelect}
          {pageSizeSelect}
        </>
      ) : (
        <>
          {pageSizeSelect}
          {pageSelect}
        </>
      )}
    </div>
  );
};

export default Pagination;
