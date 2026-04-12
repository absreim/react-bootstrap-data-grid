"use client";

import { FC, useMemo, useState } from "react";
import classNames from "classnames";
import getWidthStyle from "../grid/util/getWidthStyle";
import { ColHeaderCellProProps } from "./types";
import useSortHeaderStates from "../grid/main/ColHeaderCell/useSortHeaderStates";

const ColHeaderCellPro: FC<ColHeaderCellProProps> = ({
  label,
  sortModel,
  ariaColIndex,
  additionalClasses,
  width,
  resizeable,
  displayMode,
}) => {
  const actuallyResizeable = displayMode === "block" && resizeable;
  const cellIsClickable = !!(!actuallyResizeable && sortModel);
  const { handleClick, handleMouseOver, handleMouseOut, sortSymbol } =
    useSortHeaderStates(sortModel);
  // TODO: left this state up to the table level or rely only on a useEffect
  // hook to set the widths
  const [curWidth, setCurWidth] = useState(
    actuallyResizeable ? width || 100 : width,
  );

  const clickToSortCellContents = useMemo(() => {
    if (!width || displayMode === "table") {
      // Testing has shown that content gets cut off in a table cell only if
      // the table "display" property is "block" and both "min-width" and
      // "max-width" are specified on all cells in the column.
      return (
        <div>
          {label}
          {sortSymbol}
        </div>
      );
    }

    return (
      <div
        className={classNames("d-flex", "justify-content-between", {
          "rbdg-sort-toggler": !cellIsClickable,
        })}
        onClick={!cellIsClickable ? handleClick : undefined}
        onMouseOver={!cellIsClickable ? handleMouseOver : undefined}
        onMouseOut={!cellIsClickable ? handleMouseOut : undefined}
      >
        <div className="text-truncate">{label}</div>
        <div>{sortSymbol}</div>
      </div>
    );
  }, [
    cellIsClickable,
    displayMode,
    handleClick,
    handleMouseOut,
    handleMouseOver,
    label,
    sortSymbol,
    width,
  ]);

  const cellContents = useMemo(() => {
    if (!resizeable) {
      return clickToSortCellContents;
    }

    const dragHandleIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
      </svg>
    );

    // TODO: add event handler for dragging action
    return (
      <div className="d-flex justify-content-between">
        {clickToSortCellContents}
        <div>{dragHandleIcon}</div>
      </div>
    );
  }, [clickToSortCellContents, resizeable]);

  return (
    <th
      className={classNames(
        {
          "rbdg-sort-toggler": cellIsClickable,
          "table-active": sortModel?.sortOrder,
        },
        additionalClasses || [],
      )}
      onClick={cellIsClickable ? handleClick : undefined}
      onMouseOver={cellIsClickable ? handleMouseOver : undefined}
      onMouseOut={cellIsClickable ? handleMouseOut : undefined}
      aria-description={
        sortModel
          ? "Column header"
          : "Column header that can be clicked to change the sorting mode"
      }
      aria-colindex={ariaColIndex}
      style={getWidthStyle(curWidth)}
    >
      {cellContents}
    </th>
  );
};

export default ColHeaderCellPro;
