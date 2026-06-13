"use client";

import { FC } from "react";
import classNames from "classnames";
import { ColHeaderCellProps } from "../../types";
import getWidthStyle from "../../../common/util/getWidthStyle";
import useSortHeaderStates from "../../../common/sorting/useSortHeaderStates";
import sortOrderToAriaSort from "../../../common/sorting/sortOrderToAriaSort";

const ColHeaderCell: FC<ColHeaderCellProps> = ({
  label,
  sortModel,
  ariaColIndex,
  additionalClasses,
  width,
}) => {
  const { handleClick, handleMouseOver, handleMouseOut, sortSymbol } =
    useSortHeaderStates(sortModel);

  return (
    <th
      className={classNames(
        {
          "rbdg-sort-toggler": sortModel,
          "table-active": sortModel?.sortOrder,
        },
        additionalClasses || [],
      )}
      onClick={sortModel && handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      aria-description={
        sortModel
          ? "Column header"
          : "Column header that can be clicked to change the sorting mode"
      }
      aria-colindex={ariaColIndex}
      aria-sort={
        sortModel ? sortOrderToAriaSort(sortModel.sortOrder) : undefined
      }
      style={getWidthStyle(width)}
    >
      {label}
      {sortSymbol}
    </th>
  );
};

export default ColHeaderCell;
