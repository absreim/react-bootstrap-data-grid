"use client"

import { useState, FC, MouseEventHandler, ReactNode } from "react";
import { ColSortModel } from "./types";
import classNames from "classnames";

interface ColHeaderCellProps {
  label: string
  sortModel?: ColSortModel
}

const getUpArrow = (addlClasses?: string[]) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className={classNames(["bi", "bi-arrow-up", ...(addlClasses || [])])}
    viewBox="0 0 16 16"
  >
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
    <path
      fillRule="evenodd"
      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
    />
  </svg>
);

const ColHeaderCell: FC<ColHeaderCellProps> = ({ label, sortModel }) => {
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver: MouseEventHandler<HTMLTableCellElement> = () => setIsHovering(true)
  const handleMouseOut: MouseEventHandler<HTMLTableCellElement> = () => setIsHovering(false)
  const handleClick: () => void = () => {
    if (!sortModel) {
      return
    }

    switch (sortModel.sortOrder) {
      case null: {
        sortModel.setSortOrder('asc')
        return
      }
      case 'asc': {
        sortModel.setSortOrder('desc')
        return
      }
      case 'desc': {
        sortModel.setSortOrder(null)
      }
    }
  }
  const getSortSymbol: () => ReactNode = () => {
    if (!sortModel) {
      return null
    }

    switch (sortModel.sortOrder) {
      case null: {
        if (isHovering) {
          return getUpArrow(["text-body-secondary"])
        }
        return null
      }
      case "asc": {
        return getUpArrow()
      }
      case "desc": {
        return downArrow
      }
    }
  }

  return (
    <th onClick={sortModel && handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {label}
      {getSortSymbol()}
    </th>
  )
}

export default ColHeaderCell;
