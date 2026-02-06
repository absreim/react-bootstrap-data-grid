"use client";

import { FC, ReactNode } from "react";
import downArrow from "./sorting/downArrow";
import upArrow from "./sorting/upArrow";
import arrowPlaceholder from "./sorting/arrowPlaceholder";
import classNames from "classnames";
import useControlledHover from "./util/useControlledHover";
import { ColSortModel } from "./sorting/types";

interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
  additionalClasses?: string[];
}

const ColHeaderCell: FC<ColHeaderCellProps> = ({
  label,
  sortModel,
  ariaColIndex,
  additionalClasses,
}) => {
  const { isHovering, handleMouseOver, handleMouseOut } =
    useControlledHover<HTMLTableCellElement>();
  const handleClick: () => void = () => {
    if (!sortModel) {
      return;
    }

    switch (sortModel.sortOrder) {
      case null: {
        sortModel.setSortOrder("asc");
        return;
      }
      case "asc": {
        sortModel.setSortOrder("desc");
        return;
      }
      case "desc": {
        sortModel.setSortOrder(null);
      }
    }
  };

  const getSortSymbol: () => ReactNode = () => {
    if (!sortModel) {
      return null;
    }

    switch (sortModel.sortOrder) {
      case null: {
        if (isHovering) {
          return upArrow(true);
        }
        return arrowPlaceholder;
      }
      case "asc": {
        return upArrow(false);
      }
      case "desc": {
        return downArrow;
      }
    }
  };

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
    >
      {label}
      {getSortSymbol()}
    </th>
  );
};

export default ColHeaderCell;
