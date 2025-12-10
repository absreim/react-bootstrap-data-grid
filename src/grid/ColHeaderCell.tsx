"use client";

import { useState, FC, MouseEventHandler, ReactNode } from "react";
import { ColSortModel } from "./types";
import classNames from "classnames";

interface ColHeaderCellProps {
  label: string;
  sortModel?: ColSortModel;
  ariaColIndex: number;
}

const getUpArrow = (grayed: boolean) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className={classNames([
      "bi",
      "bi-arrow-up",
      ...(grayed ? ["text-body-secondary"] : []),
    ])}
    viewBox="0 0 16 16"
  >
    {!grayed && (
      <>
        <title>(sorted ascending)</title>
        <desc>
          Up arrow indicating that the column is being sorted in an ascending
          manner
        </desc>
      </>
    )}
    <path
      fillRule="evenodd"
      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
    />
  </svg>
);

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-down"
    viewBox="0 0 16 16"
  >
    <title>(sorted descending)</title>
    <desc>
      Down arrow indicating that the column is being sorted in an descending
      manner
    </desc>
    <path
      fillRule="evenodd"
      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
    />
  </svg>
);

// Temporary solution to prevent column widths from changing when hovering over
// columns with a mouse.
// More ideal permanent solution would be to fix column widths based on preset
// values.
const placeholder = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-down"
    viewBox="0 0 16 16"
  ></svg>
);

const ColHeaderCell: FC<ColHeaderCellProps> = ({
  label,
  sortModel,
  ariaColIndex,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver: MouseEventHandler<HTMLTableCellElement> = () =>
    setIsHovering(true);
  const handleMouseOut: MouseEventHandler<HTMLTableCellElement> = () =>
    setIsHovering(false);
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
          return getUpArrow(true);
        }
        return placeholder;
      }
      case "asc": {
        return getUpArrow(false);
      }
      case "desc": {
        return downArrow;
      }
    }
  };

  return (
    <th
      onClick={sortModel && handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      aria-description={
        sortModel
          ? "Column header"
          : "Column header that can be clicked to change the sorting mode"
      }
      style={{ cursor: sortModel ? "pointer" : "default" }}
      aria-colindex={ariaColIndex}
    >
      {label}
      {getSortSymbol()}
    </th>
  );
};

export default ColHeaderCell;
