import {
  FC,
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useMemo,
} from "react";
import HorizontalGrip from "../assets/HorizontalGrip";
import { ReorderStyles, RowId } from "../";
import { KeyboardCleanupFnParam, PointerCleanupFnParam } from "../util/types";
import regDragCleanup from "../util/regDragCleanup";
import classNames from "classnames";

export type ReorderHandleCellProps = {
  rowId: RowId;
  ariaRowIndex: number;
  // id of current row should be included in the function
  reorderCallback: (destIndex: number) => void;
  keyboardStartCallback: () => void;
  // generally, reordering is disabled when sorting or filtering is enabled
  disabled: boolean;
  styles: ReorderStyles;
};

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
  ariaRowIndex,
  disabled,
  reorderCallback,
  styles: {
    draggedRowClasses,
    draggedRowPredecessorClasses,
    topBorderRowClasses,
    bottomBorderRowClasses,
    ghostDivClasses,
  },
  keyboardStartCallback,
}) => {
  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      const { pointerId, clientX, clientY, button } = event;

      if (button !== 0) {
        return;
      }

      function createDragGhost() {
        const ghostDiv = document.createElement("div");
        ghostDiv.className = ghostDivClasses.join(" ");
        ghostDiv.style.left = `${clientX}px`;
        ghostDiv.style.top = `${clientY}px`;
        ghostDiv.textContent = `ID: ${rowId}`;
        ghostDiv.setAttribute("data-testid", "rbdg-drag-ghost");

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
        applyRowClassesFromOrig(drageeTrIndex, draggedRowClasses);
        if (drageeTrIndex - 1 === -1) {
          headTr.className = [
            origHeadTrClasses,
            draggedRowPredecessorClasses.join(" "),
          ]
            .join(" ")
            .trim();
          return;
        }

        applyRowClassesFromOrig(
          drageeTrIndex - 1,
          draggedRowPredecessorClasses,
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
          applyRowClassesFromBase(trIndex, bottomBorderRowClasses);
        }

        if (upper && trIndex - 1 >= 0) {
          applyRowClassesFromBase(trIndex - 1, topBorderRowClasses);
        }

        if (upper && trIndex - 1 === -1) {
          headTr.className = [baseHeadTrClasses, topBorderRowClasses.join(" ")]
            .join(" ")
            .trim();
        }

        if (!upper) {
          applyRowClassesFromBase(trIndex, topBorderRowClasses);
        }

        if (!upper && trIndex + 1 < trs.length) {
          applyRowClassesFromBase(trIndex + 1, bottomBorderRowClasses);
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
      bottomBorderRowClasses,
      draggedRowClasses,
      draggedRowPredecessorClasses,
      ghostDivClasses,
      topBorderRowClasses,
      reorderCallback,
      rowId,
    ],
  );

  const label = `Reorder Row ${ariaRowIndex}`;

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (event.detail === 0) {
      keyboardStartCallback();
    }
  };

  return (
    <th aria-colindex={1}>
      <button
        onClick={onClick}
        aria-label={label}
        title={label}
        onPointerDown={onPointerDown}
        className={classNames(
          "rbdg-draggable-container",
          "rbdg-reorder-container",
          "rbdg-plain-icon-button",
          {
            "bs-btn-disabled": disabled,
          },
        )}
        disabled={disabled}
      >
        <HorizontalGrip className="rbdg-draggable-icon" />
      </button>
    </th>
  );
};

export default ReorderHandleCell;
