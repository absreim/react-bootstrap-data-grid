import { RowId } from "../";
import { useState } from "react";

export interface KeyboardReorderState {
  rowId: RowId;
  destIndex: number;
}

export interface UseKeyboardReorderOutput {
  // A change the displayed rows can suddenly make the existing state invalid.
  // To cope with this possibility, the hook checks the validity of the state on
  // each render and defaults to null when the state is invalid.
  // Consumers of the hook can then call setState (generally via user
  // interaction) to set the state back to a valid value.
  effectiveState: KeyboardReorderState | null;
  setState: (state: KeyboardReorderState | null) => void;
}

const useKeyboardReorder: (
  displayRowIds: RowId[],
) => UseKeyboardReorderOutput = (displayRowIds) => {
  const [state, setState] = useState<KeyboardReorderState | null>(null);

  const defaultOutput = {
    effectiveState: null,
    setState,
  };

  if (displayRowIds.length <= 1 || state === null) {
    return defaultOutput;
  }

  const drageeIndex = displayRowIds.findIndex((id) => state.rowId === id);

  if (drageeIndex < 0) {
    return defaultOutput;
  }

  if (drageeIndex === state.destIndex || drageeIndex === state.destIndex + 1) {
    return defaultOutput;
  }

  return {
    effectiveState: state,
    setState
  };
};

export default useKeyboardReorder;
