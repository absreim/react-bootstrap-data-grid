import { FC, PointerEventHandler, useCallback, useMemo } from "react";
import HorizontalGrip from "../assets/HorizontalGrip";
import { RowId } from "../";
import { KeyboardCleanupFnParam, PointerCleanupFnParam } from "../util/types";
import regDragCleanup from "../util/regDragCleanup";

export interface ReorderHandleCellProps {
  rowId: RowId;
  index: number;
  // id of current row should be included in the function
  reorderCallback: (destIndex: number) => void;
  // generally, reordering is disabled when sorting or filtering is enabled
  disabled: boolean;
  draggedRowClasses?: string[];
  draggedRowPredecessorClasses?: string[];
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
  draggedRowPredecessorClasses,
  topBorderRowClasses,
  bottomBorderRowClasses,
  ghostTableClasses,
}) => {
  const intDraggedRowClasses = useMemo(
    () => draggedRowClasses || ["rbdg-reorder-dragged-row"],
    [draggedRowClasses],
  );

  const intDraggedRowPredecessorClasses = useMemo(
    () => draggedRowPredecessorClasses || ["rbdg-reorder-dragged-row-pred"],
    [draggedRowPredecessorClasses],
  );

  const intTopBorderRowClasses = useMemo(
    () => topBorderRowClasses || ["reorder-above-drag-target-row"],
    [topBorderRowClasses],
  );

  const intBottomBorderRowClasses = useMemo(
    () => bottomBorderRowClasses || ["reorder-below-drag-target-row"],
    [bottomBorderRowClasses],
  );

  const intGhostTableClasses = useMemo(
    () => ghostTableClasses || ["border", "rbdg-drag-ghost"],
    [ghostTableClasses],
  );

  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      const { pointerId, clientX, clientY, button } = event;

      if (button !== 0) {
        return;
      }

      function createDragGhost() {
        const ghostDiv = document.createElement("div");
        ghostDiv.className = intGhostTableClasses.join(" ");
        ghostDiv.style.left = `${clientX}px`;
        ghostDiv.style.top = `${clientY}px`;
        ghostDiv.textContent = `ID: ${rowId}`;

        document.body.appendChild(ghostDiv);
        return ghostDiv;
      }

      const drageeTh = target.parentElement!;
      const drageeTr = drageeTh.parentElement!;
      const tbody = drageeTr.parentElement!;
      const thead = tbody.parentElement!.firstChild!;
      const headTr = thead!.firstChild as HTMLTableRowElement;
      const trs = Array.from(tbody.children);
      const drageeTrIndex = Number(drageeTr.ariaRowIndex) - 2;
      const origClassesByIndex = trs.map((tr) => tr.className);
      const origHeadTrClasses = headTr.className;

      function applyRowClassesFromOrig(trIndex: number, classes: string[]) {
        trs[trIndex].className = [
          origClassesByIndex[trIndex],
          classes.join(" "),
        ]
          .join(" ")
          .trim();
      }

      function applyDrageeStyles() {
        applyRowClassesFromOrig(drageeTrIndex, intDraggedRowClasses);
        if (drageeTrIndex - 1 === -1) {
          headTr.className = [
            origHeadTrClasses,
            intDraggedRowPredecessorClasses.join(" "),
          ]
            .join(" ")
            .trim();
          return;
        }

        applyRowClassesFromOrig(
          drageeTrIndex - 1,
          intDraggedRowPredecessorClasses,
        );
      }

      applyDrageeStyles();
      const baseClassesByIndex = trs.map((tr) => tr.className);
      const baseHeadTrClasses = headTr.className;

      const rectToIndex = trs.reduce((map, element, trIndex) => {
        if (trIndex !== drageeTrIndex) {
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

          if (clientY <= midY && rectIndex - 1 === drageeTrIndex) {
            return null;
          }

          if (clientY <= midY && rectIndex - 1 !== drageeTrIndex) {
            return { index: rectIndex, upper: true };
          }

          if (clientY > midY && rectIndex + 1 === drageeTrIndex) {
            return null;
          }

          if (clientY > midY && rectIndex + 1 !== drageeTrIndex) {
            return { index: rectIndex, upper: false };
          }
        }

        return null;
      }

      function restoreOrigRowClasses(trIndex: number): void {
        trs[trIndex].className = origClassesByIndex[trIndex];
      }

      function restoreOrigClasses() {
        trs.forEach((_, trIndex) => restoreOrigRowClasses(trIndex));
        headTr.className = origHeadTrClasses;
      }

      function restoreBaseRowClasses(trIndex: number): void {
        trs[trIndex].className = baseClassesByIndex[trIndex];
      }

      function restoreBaseClasses() {
        trs.forEach((_, trIndex) => restoreBaseRowClasses(trIndex));
        headTr.className = baseHeadTrClasses;
      }

      function applyRowClassesFromBase(trIndex: number, classes: string[]) {
        trs[trIndex].className = [
          baseClassesByIndex[trIndex],
          classes.join(" "),
        ]
          .join(" ")
          .trim();
      }

      function applyDragStyles(trIndex: number, upper: boolean) {
        if (upper) {
          applyRowClassesFromBase(trIndex, intBottomBorderRowClasses);
        }

        if (upper && trIndex - 1 >= 0) {
          applyRowClassesFromBase(trIndex - 1, intTopBorderRowClasses);
        }

        if (upper && trIndex - 1 === -1) {
          headTr.className = [
            baseHeadTrClasses,
            intTopBorderRowClasses.join(" "),
          ]
            .join(" ")
            .trim();
        }

        if (!upper) {
          applyRowClassesFromBase(trIndex, intTopBorderRowClasses);
        }

        if (!upper && trIndex + 1 < trs.length) {
          applyRowClassesFromBase(trIndex + 1, intBottomBorderRowClasses);
        }
      }

      function updateRowStyles(currentDropTargetVal: DropTargetRefValue): void {
        if (
          dropTargetRefValuesEqual(dropTargetRef.current, currentDropTargetVal)
        ) {
          return;
        }

        if (currentDropTargetVal === null) {
          restoreBaseClasses();
          dropTargetRef.current = null;
          return;
        }

        if (dropTargetRef.current !== null) {
          restoreBaseClasses();
        }

        applyDragStyles(currentDropTargetVal.index, currentDropTargetVal.upper);

        dropTargetRef.current = currentDropTargetVal;
      }

      target.setPointerCapture(pointerId);
      const dragGhost = createDragGhost();
      applyDrageeStyles();

      function onPointerMove({ clientX, clientY }: PointerEvent): void {
        dragGhost.style.left = `${clientX}px`;
        dragGhost.style.top = `${clientY}px`;

        const dragTargetVal = detectEnclosure(clientX, clientY);
        updateRowStyles(dragTargetVal);
      }

      function onContextMenu(event: PointerEvent) {
        event.preventDefault();
      }

      function cleanUpDragStates() {
        dragGhost.remove();
        restoreOrigClasses();
      }

      const onKeyDown: KeyboardCleanupFnParam =
        (removeListeners) => (event) => {
          if (event.code === "Escape") {
            removeListeners();
            cleanUpDragStates();
            dropTargetRef.current = null;
          }
        };

      const onPointerUp: PointerCleanupFnParam = (removeListeners) => () => {
        removeListeners();
        cleanUpDragStates();
        if (dropTargetRef.current !== null) {
          reorderCallback(
            dropTargetRef.current.index + (dropTargetRef.current.upper ? 0 : 1),
          );
        }
      };

      target.focus();

      regDragCleanup({
        element: target,
        onPointerMove,
        onPointerUp,
        onPointerCancel: onPointerUp,
        onKeyDown,
        onContextMenu,
      });
    },
    [
      index,
      intBottomBorderRowClasses,
      intDraggedRowClasses,
      intDraggedRowPredecessorClasses,
      intGhostTableClasses,
      intTopBorderRowClasses,
      reorderCallback,
      rowId,
    ],
  );

  return (
    <th aria-colindex={1}>
      <button
        title="Reorder Row"
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
