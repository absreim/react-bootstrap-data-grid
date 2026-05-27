import { RowId } from "../";
import { useCallback, useMemo, useState } from "react";

export interface KeyboardReorderState {
  rowId: RowId;
  destIndex: number;
}

export type ActiveKeyboardReorderState = KeyboardReorderState & {
  moveToPrevTarget: () => void;
  moveToNextTarget: () => void;
  clearState: () => void;
  drageeIndex: number;
};

export interface UseKeyboardReorderOutput {
  drageeState: ActiveKeyboardReorderState | null;
  setDragee: (rowId: RowId) => void;
}

const useKeyboardReorder: (
  displayRowIds: RowId[],
) => UseKeyboardReorderOutput = (displayRowIds) => {
  const [state, setState] = useState<KeyboardReorderState | null>(null);
  // A change the displayed rows can suddenly make the existing state invalid.
  // To cope with this possibility, the hook checks the validity of the state on
  // each render and defaults to null when the state is invalid.
  // Consumers of the hook can then call setState (generally via user
  // interaction) to set the state back to a valid value.
  const effectiveState = useMemo(() => {
    if (displayRowIds.length <= 1 || state === null) {
      return null;
    }

    const drageeIndex = displayRowIds.findIndex((id) => state.rowId === id);

    if (drageeIndex < 0) {
      return null;
    }

    if (
      drageeIndex === state.destIndex ||
      drageeIndex === state.destIndex + 1
    ) {
      return null;
    }

    return state;
  }, [displayRowIds, state]);

  const setDragee: (rowId: RowId) => void = useCallback(
    (rowId) => {
      const foundIndex = displayRowIds.findIndex((id) => rowId === id);
      if (foundIndex < 0) {
        return;
      }

      // Shouldn't happen under normal circumstances dye to the button being
      // disabled in the UI. Not sure if some sort of
      // race condition is possible with React to get this situation to occur.
      if (displayRowIds.length < 2) {
        return;
      }

      if (foundIndex + 2 > displayRowIds.length) {
        setState({
          rowId,
          destIndex: foundIndex - 1,
        });
        return;
      }

      setState({
        rowId,
        destIndex: foundIndex + 2,
      });
    },
    [displayRowIds],
  );

  const output: UseKeyboardReorderOutput = useMemo(() => {
    if (effectiveState === null) {
      return {
        drageeState: null,
        setDragee,
      };
    }

    const moveToPrevTarget: () => void = () => {
      let newIndex = effectiveState.destIndex - 1;
      if (newIndex < 0) {
        newIndex = displayRowIds.length;
      }

      const foundIndex = displayRowIds.findIndex(
        (id) => effectiveState.rowId === id,
      );
      if (newIndex === foundIndex + 1) {
        newIndex = newIndex - 2;
      }

      setState({
        rowId: effectiveState.rowId,
        destIndex: newIndex,
      });
    };

    const moveToNextTarget: () => void = () => {
      let newIndex = effectiveState.destIndex + 1;
      if (newIndex > displayRowIds.length) {
        newIndex = 0;
      }

      const foundIndex = displayRowIds.findIndex(
        (id) => effectiveState.rowId === id,
      );
      if (newIndex === foundIndex) {
        newIndex = newIndex + 2;
      }

      setState({
        rowId: effectiveState.rowId,
        destIndex: newIndex,
      });
    };

    return {
      drageeState: {
        ...effectiveState,
        moveToPrevTarget,
        moveToNextTarget,
        clearState: () => setState(null),
        drageeIndex: displayRowIds.findIndex((id) => effectiveState.rowId === id),
      } as ActiveKeyboardReorderState,
      setDragee,
    };
  }, [displayRowIds, effectiveState, setDragee]);

  return output;
};

export default useKeyboardReorder;
