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
};

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
    () => topBorderRowClasses || ["rbdg-dragged-over-top"],
    [topBorderRowClasses],
  );

  const intBottomBorderRowClasses = useMemo(
    () => bottomBorderRowClasses || ["rbdg-dragged-over-bottom"],
    [bottomBorderRowClasses],
  );

  const intGhostTableClasses = useMemo(
    () => ghostTableClasses || ["table", "rbdg-drag-ghost"],
    [ghostTableClasses],
  );

  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      const { pointerId, clientX, clientY, button } = event;

      if (button !== 0) {
        return;
      }

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

        document.body.appendChild(ghostTable);
        return ghostTable;
      }

      const tbody = getTBody();
      const trs = Array.from(tbody.children);
      const origClassesByIndex = trs.map((tr) => tr.className);

      const rectToIndex = trs.reduce((map, element, trIndex) => {
        if (trIndex !== index) {
          map.set(element.getBoundingClientRect(), trIndex);
        }
        return map;
      }, new Map<DOMRect, number>());

      const dropTargetRef: DropTargetRef = {
        current: null,
      };

      function detectEnclosure(
        clientX: number,
        clientY: number,
      ): DropTargetRefValue {
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

      function restoreOrigClasses(index: number): void {
        trs[index].className = origClassesByIndex[index];
      }

      function applyRowClasses(index: number, classes: string[]) {
        trs[index].className = [
          origClassesByIndex[index],
          classes.join(" "),
        ].join(" ");
      }

      function updateRowStyles(currentDropTargetVal: DropTargetRefValue): void {
        if (
          dropTargetRefValuesEqual(dropTargetRef.current, currentDropTargetVal)
        ) {
          return;
        }

        if (currentDropTargetVal === null) {
          trs.forEach((tr) => {
            tr.removeAttribute("style"); // todo: change to remove classes instead
          });
          dropTargetRef.current = null;
          return;
        }

        if (dropTargetRef.current !== null) {
          restoreOrigClasses(dropTargetRef.current.index);
        }

        if (currentDropTargetVal.upper) {
          applyRowClasses(currentDropTargetVal.index, intTopBorderRowClasses);
        }

        if (!currentDropTargetVal.upper) {
          applyRowClasses(
            currentDropTargetVal.index,
            intBottomBorderRowClasses,
          );
        }

        dropTargetRef.current = currentDropTargetVal;
      }

      target.setPointerCapture(pointerId);
      const dragGhost = createDragGhost();
      applyRowClasses(index, intDraggedRowClasses);

      function onPointerMove({ clientX, clientY }: PointerEvent): void {
        dragGhost.style.left = `${clientX}px`;
        dragGhost.style.top = `${clientY}px`;

        const dragTargetVal = detectEnclosure(clientX, clientY);
        updateRowStyles(dragTargetVal);
      }

      target.addEventListener("pointermove", onPointerMove);

      function cleanUpDragStates() {
        dragGhost.remove();
        target.removeEventListener("pointermove", onPointerMove);
        trs.forEach((_, index) => restoreOrigClasses(index));
      }

      function onKeydown(event: KeyboardEvent): void {
        if (event.code === "Escape") {
          cleanUpDragStates();
          dropTargetRef.current = null;
        }
      }

      document.addEventListener("keydown", onKeydown);

      function onPointerUp(): void {
        cleanUpDragStates();
        if (dropTargetRef.current !== null) {
          reorderCallback(dropTargetRef.current.index);
          document.removeEventListener("keydown", onKeydown);
        }
      }

      target.addEventListener("pointerup", onPointerUp, { once: true });
    },
    [
      index,
      intBottomBorderRowClasses,
      intDraggedRowClasses,
      intGhostTableClasses,
      intTopBorderRowClasses,
      reorderCallback,
      rowId,
    ],
  );

  return (
    <th aria-colindex={1}>
      <button
        onPointerDown={onPointerDown}
        className="rbdg-draggable-container rbdg-reorder-container rbdg-plain-icon-button"
        disabled={disabled}
      >
        <HorizontalGrip className="rbdg-draggable-icon" />
      </button>
    </th>
  );
};

export default ReorderHandleCell;
