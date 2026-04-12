"use client";

import { FC, ReactNode } from "react";
import useControlledHover from "../grid/util/useControlledHover";
import upArrow from "../grid/sorting/upArrow";
import arrowPlaceholder from "../grid/sorting/arrowPlaceholder";
import downArrow from "../grid/sorting/downArrow";
import classNames from "classnames";
import getWidthStyle from "../grid/util/getWidthStyle";
import { ColHeaderCellProProps } from "./types";

const ColHeaderCellPro: FC<ColHeaderCellProProps> = ({
  label,
  sortModel,
  ariaColIndex,
  additionalClasses,
  width,
  resizeable
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
      style={getWidthStyle(width)}
    >
      {label}
      {getSortSymbol()}
    </th>
  );
};

export default ColHeaderCellPro;
