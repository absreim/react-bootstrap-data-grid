import { EditableTableFilterState, TableFilterState } from "../types";
import { useMemo } from "react";

const useEditableFromFilterState: (
  filterState: TableFilterState | null,
) => EditableTableFilterState | null = (filterState) => {
  return useMemo(() => {
    if (filterState === null) {
      return null;
    }

    const editableState: EditableTableFilterState = {};
    Object.keys(filterState).forEach((columnName) => {
      editableState[columnName] = filterState[columnName].editableState;
    });

    return editableState;
  }, [filterState]);
};

export default useEditableFromFilterState;
