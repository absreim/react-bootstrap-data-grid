import { FC } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import { Size } from "../types";

export interface PaginationProps {
  componentSize: Size;
  pageSizeOptions: number[];
  pageSizeIndex: number;
  handleSetPageSize: (index: number) => void;
  handleSetPageNum: (index: number) => void;
  numRows: number;
  maxPageButtons: number;
  currentPage: number;
}

// TODO: adjust grid to use this component
const Pagination: FC<PaginationProps> = ({
  componentSize,
  pageSizeOptions,
  pageSizeIndex,
  handleSetPageSize,
  handleSetPageNum,
  numRows,
  maxPageButtons,
  currentPage,
}) => {
  const numPages = Math.ceil(numRows / pageSizeOptions[pageSizeIndex]);

  return (
    <div className="d-flex justify-content-end gap-2">
      <PageSizeSelector
        componentSize={componentSize}
        pageSizeOptions={pageSizeOptions}
        pageSizeIndex={pageSizeIndex}
        handleSetPageSize={handleSetPageSize}
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
