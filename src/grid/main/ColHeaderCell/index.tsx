"use client";

import { FC } from "react";
import classNames from "classnames";
import { ColHeaderCellProps } from "../../types";
import getWidthStyle from "../../util/getWidthStyle";
import useSortHeaderStates from "./useSortHeaderStates";

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
          "rbdg-clickable-grid-header-cell": sortModel,
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
      style={getWidthStyle(width)}
    >
      {label}
      {sortSymbol}
    </th>
  );
};

export default ColHeaderCell;
