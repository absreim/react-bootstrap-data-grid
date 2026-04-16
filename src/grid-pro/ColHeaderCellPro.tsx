"use client";

import { FC, PointerEventHandler, useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import getWidthStyle from "../grid/util/getWidthStyle";
import { ColHeaderCellProProps } from "./types";
import useSortHeaderStates from "../grid/main/ColHeaderCell/useSortHeaderStates";

const setWidthStyle: (cells: HTMLTableCellElement[], width: number) => void = (
  cells,
  width,
) => {
  cells.forEach((cell) => {
    cell.style.minWidth = `${width}px`;
    cell.style.maxWidth = `${width}px`;
  });
};

const ColHeaderCellPro: FC<ColHeaderCellProProps> = ({
  label,
  sortModel,
  ariaColIndex,
  additionalClasses,
  width,
  displayMode,
  setWidth,
}) => {
  const resizeable = setWidth !== undefined;
  const cellIsClickable = !!(resizeable && sortModel);
  const sortDivClickable = resizeable && sortModel;
  const { handleClick, handleMouseOver, handleMouseOut, sortSymbol } =
    useSortHeaderStates(sortModel);
  const minResizeWidth = sortModel ? 64 : 32;

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
        className={classNames(
          "d-flex",
          "justify-content-between",
          "flex-shrink-1",
          "overflow-x-hidden",
          {
            "rbdg-sort-toggler": sortDivClickable,
            "text-truncate": !!sortModel,
          },
        )}
        onClick={sortDivClickable ? handleClick : undefined}
        onMouseOver={sortDivClickable ? handleMouseOver : undefined}
        onMouseOut={sortDivClickable ? handleMouseOut : undefined}
      >
        {sortModel ? (
          <>
            <div className="text-truncate">{label}</div>
            <div>{sortSymbol}</div>
          </>
        ) : (
          label
        )}
      </div>
    );
  }, [
    displayMode,
    handleClick,
    handleMouseOut,
    handleMouseOver,
    label,
    sortDivClickable,
    sortModel,
    sortSymbol,
    width,
  ]);

  const thRef = useRef<HTMLTableCellElement>(null);
  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (
        thRef.current === null ||
        setWidth === undefined ||
        width === undefined
      ) {
        return;
      }

      // Note: as it stands, if a rerender happens while the user is resizing a
      // cell, it may override the width of the cell until the user moves the
      // mouse again.
      // This behavior can be prevented by storing the current width of the cell
      // in a ref and having this component conditionally render based on the
      // value of the ref. I.e., if the ref has a value, use that value for the
      // width instead of the "width" prop.

      const target = event.target as HTMLDivElement;

      target.setPointerCapture(event.pointerId);
      const table = thRef.current.parentElement!.parentElement!
        .parentElement! as HTMLTableElement;
      const tds = table.querySelectorAll(
        `:scope > tbody > tr > td:nth-child(${ariaColIndex})`,
      ) as NodeListOf<HTMLTableCellElement>;
      const cellsToUpdate = Array.from(tds).concat(thRef.current);
      const origX = event.clientX;

      const onPointerMove: (event: PointerEvent) => void = (event) => {
        const diff = event.clientX - origX;
        const newWidth = Math.max(minResizeWidth, width + diff);
        setWidthStyle(cellsToUpdate, newWidth);
      };
      target.addEventListener("pointermove", onPointerMove);

      const removePointerMove = () =>
        target.removeEventListener("pointermove", onPointerMove);
      const onKeyDown: (event: KeyboardEvent) => void = (event) => {
        if (event.code === "Escape") {
          setWidthStyle(cellsToUpdate, width);
          removePointerMove();
        }
      };
      document.addEventListener("keydown", onKeyDown, { once: true });

      const onPointerUp: () => void = () => {
        if (thRef.current !== null) {
          const newWidth = Number(
            thRef.current.style.minWidth.replace("px", ""),
          );
          setWidth(newWidth);
        }
        removePointerMove();
        document.removeEventListener("keydown", onKeyDown);
      };
      target.addEventListener("pointerup", onPointerUp, { once: true });
    },
    [ariaColIndex, minResizeWidth, setWidth, width],
  );

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
        className="rdbg-drag-marker"
      >
        <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
      </svg>
    );

    return (
      <div className="d-flex justify-content-between">
        {clickToSortCellContents}
        <div
          className="rdbg-drag-marker-container"
          onPointerDown={onPointerDown}
        >
          {dragHandleIcon}
        </div>
      </div>
    );
  }, [clickToSortCellContents, onPointerDown, resizeable]);

  return (
    <th
      ref={thRef}
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
      style={getWidthStyle(width)}
    >
      {cellContents}
    </th>
  );
};

export default ColHeaderCellPro;
