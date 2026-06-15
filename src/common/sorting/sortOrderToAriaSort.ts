import { SortOrder } from "./types";
import { AriaAttributes } from "react";

const sortOrderToAriaSort: (
  sortOrder: SortOrder | null,
) => AriaAttributes["aria-sort"] = (sortOrder) => {
  switch (sortOrder) {
    case "asc":
      return "ascending";
    case "desc":
      return "descending";
    default:
      return "none";
  }
};

export default sortOrderToAriaSort;
