import { JustifyContentSetting, Size } from "../types";

export interface GridPaginationState {
  pageSizeOptions: number[];
  pageSizeIndex: number;
  setPageSizeIndex: (pageSizeIndex: number) => void;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
  maxPageButtons: number;
  componentSize?: Size;
  pageSelectorAriaLabel?: string;
  pageSelectorJustifyContent?: JustifyContentSetting;
}
