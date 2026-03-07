import { JustifyContentSetting, Size } from "../types";

export interface PaginationOptions {
  pageSizeOptions?: number[];
  maxPageButtons?: number;
  componentSize?: Size;
  pageSelectorAriaLabel?: string;
  pageSelectorJustifyContent?: JustifyContentSetting;
}

export type ControlledPaginationModel = PaginationOptions & {
  type?: "controlled";
  pageSizeIndex: number;
  setPageSizeIndex: (pageSizeIndex: number) => void;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
};

export type UncontrolledPaginationModel = PaginationOptions & {
  type: "uncontrolled";
  startingPageSizeIndex?: number;
  startingCurrentPage?: number;
};

export type PaginationModel =
  | ControlledPaginationModel
  | UncontrolledPaginationModel;
