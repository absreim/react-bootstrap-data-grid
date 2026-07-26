import { useMemo } from "react";
import {
  EditableFilterState,
  FilterState,
} from "../../filtering/types";

const useEditableFromFilterState: (
  filterState: FilterState | null,
) => EditableFilterState | null = (filterState) => {
  return useMemo(() => {
    if (filterState === null) {
      return null;
    }

    const editableState: EditableFilterState = {};
    Object.keys(filterState).forEach((columnName) => {
      editableState[columnName] = filterState[columnName].editableState;
    });

    return editableState;
  }, [filterState]);
};

export default useEditableFromFilterState;
