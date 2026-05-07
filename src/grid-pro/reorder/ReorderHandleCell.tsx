import { FC, PointerEventHandler, useCallback, useMemo } from "react";
import HorizontalGrip from "../assets/HorizontalGrip";
import { RowId } from "../";

export interface ReorderHandleCellProps {
  rowId: RowId;
  index: number;
  // id of current row should be included in the function
  reorderCallback: (destIndex: number) => void;
  // generally, reordering is disabled when sorting or filtering is enabled
  disabled: boolean;
  draggedRowClasses?: string[];
  topBorderRowClasses?: string[];
  bottomBorderRowClasses?: string[];
  ghostTableClasses?: string[];
}

interface DropTargetRef {
  current: DropTargetRefValue;
}

type DropTargetRefValue = null | {
  index: number;
  upper: boolean;
}

function dropTargetRefValuesEqual(
  first: DropTargetRefValue,
  second: DropTargetRefValue,
) {
  if (first === null && second === null) {
    return true;
  }

  if (first === null || second === null) {
    return false;
  }

  return first.index === second.index && first.upper === second.upper;
}

const ReorderHandleCell: FC<ReorderHandleCellProps> = ({
  rowId,
  index,
  disabled,
  reorderCallback,
  draggedRowClasses,
  topBorderRowClasses,
  bottomBorderRowClasses,
  ghostTableClasses,
}) => {
  const intDraggedRowClasses = useMemo(
    () =>
      draggedRowClasses || ["border", "border-3", "rbdg-reorder-dragged-row"],
    [draggedRowClasses],
  );

  const intTopBorderRowClasses = useMemo(
    () => topBorderRowClasses || ["border", "border-top-3"],
    [topBorderRowClasses],
  );

  const intBottomBorderRowClasses = useMemo(
    () => bottomBorderRowClasses || ["border", "border-bottom-3"],
    [bottomBorderRowClasses],
  );

  const intGhostTableClasses = useMemo(
    () => ghostTableClasses || ["table", "rbdg-drag-ghost"],
    [ghostTableClasses],
  );

  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      const { pointerId, clientX, clientY } = event;
      target.setPointerCapture(pointerId);

      function getTBody() {
        let cursor: HTMLElement = target;
        while (cursor.tagName !== "TBODY") {
          cursor = cursor.parentElement!;
        }
        return cursor;
      }

      function createDragGhost() {
        const ghostTable = document.createElement("table");
        ghostTable.className = intGhostTableClasses.join(" ");
        ghostTable.style.left = `${clientX}px`;
        ghostTable.style.top = `${clientY}px`;

        const thead = ghostTable.createTHead();
        const headTr = document.createElement("tr");
        const idTh = document.createElement("th");
        idTh.textContent = "ID";
        headTr.appendChild(idTh);
        const indexTh = document.createElement("th");
        indexTh.textContent = "Index";
        headTr.appendChild(indexTh);
        thead.appendChild(headTr);

        const tbody = ghostTable.createTBody();
        const bodyTr = document.createElement("tr");
        const idTd = document.createElement("td");
        idTd.textContent = String(rowId);
        bodyTr.appendChild(idTd);
        const indexTd = document.createElement("td");
        indexTd.textContent = String(index);
        bodyTr.appendChild(indexTd);
        tbody.appendChild(bodyTr);

        return ghostTable;
      }

      const tbody = getTBody();
      const trs = Array.from(tbody.children);
      const origClassesByIndex = trs.map((tr) => tr.className);

      const rectToIndex = trs.reduce((map, element, trIndex) => {
        if (trIndex !== index) {
          map.set(element.getBoundingClientRect(), index);
        }
        return map;
      }, new Map<DOMRect, number>());

      const dropTargetRef: DropTargetRef = {
        current: null,
      };

      function detectEnclosure(): DropTargetRefValue {
        for (const rect of rectToIndex.keys()) {
          if (
            clientY < rect.top ||
            clientY > rect.bottom ||
            clientX < rect.left ||
            clientX > rect.right
          ) {
            continue;
          }

          const midY = Math.floor(rect.top + rect.bottom) / 2;
          const rectIndex = rectToIndex.get(rect)!;

          if (clientY <= midY && rectIndex - 1 === index) {
            return null;
          }

          if (clientY <= midY && rectIndex - 1 !== index) {
            return { index: rectIndex, upper: true };
          }

          if (clientY > midY && rectIndex + 1 === index) {
            return null;
          }

          if (clientY > midY && rectIndex + 1 !== index) {
            return { index: rectIndex, upper: false };
          }
        }

        return null;
      }

      function updateStyles(currentDropTargetVal: DropTargetRefValue): void {
        if (
          dropTargetRefValuesEqual(dropTargetRef.current, currentDropTargetVal)
        ) {
          return;
        }

        if (currentDropTargetVal === null) {
          trs.forEach((tr) => {
            tr.removeAttribute("style");
          });
          dropTargetRef.current = null;
          return;
        }

        if (dropTargetRef.current !== null) {
          trs[dropTargetRef.current.index].removeAttribute("style");
        }

        if (currentDropTargetVal.upper) {
          trs[currentDropTargetVal.index].style.borderTop = "4px solid blue";
        }

        if (!currentDropTargetVal.upper) {
          trs[currentDropTargetVal.index].style.borderBottom = "4px solid blue";
        }

        dropTargetRef.current = currentDropTargetVal;
      }
    },
    [index, intGhostTableClasses, rowId],
  );

  return (
    <th aria-colindex={1}>
      <button
        className="rbdg-draggable-container rbdg-reorder-container rbdg-plain-icon-button"
        disabled={disabled}
      >
        <HorizontalGrip className="rbdg-draggable-icon" />
      </button>
    </th>
  );
};

export default ReorderHandleCell;
