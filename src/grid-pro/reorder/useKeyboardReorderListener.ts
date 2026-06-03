import { ActiveKeyboardReorderState, ReorderCallback } from "./types";
import { useCallback } from "react";

const useKeyboardReorderListener: (
  state: ActiveKeyboardReorderState | null,
  reorderCallback: ReorderCallback | undefined,
) => (event: KeyboardEvent) => void = (state, reorderCallback) => {
  return useCallback(
    (event) => {
      if (state === null || reorderCallback === undefined) {
        return;
      }

      const {
        moveToPrevTarget,
        moveToNextTarget,
        clearState,
        rowId,
        destIndex,
      } = state;

      if (event.key === "ArrowUp") {
        moveToPrevTarget();
        return;
      }

      if (event.key === "ArrowDown") {
        moveToNextTarget();
        return;
      }

      if (event.key === " " || event.key === "Enter") {
        reorderCallback(rowId, destIndex);
        clearState();
        return;
      }

      if (event.key === "Escape") {
        clearState();
      }
    },
    [reorderCallback, state],
  );
};

export default useKeyboardReorderListener;
