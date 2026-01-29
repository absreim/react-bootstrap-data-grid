import { useMemo } from "react";
import { ColDef } from "../types";
import { EditableTableFilterState, TableFilterState } from "../filtering/types";

const useFilterStateFromEditable: (
  colDefs: ColDef[],
  editableFilterState: EditableTableFilterState | null,
) => TableFilterState | null = (colDefs, editableFilterState) => {
  return useMemo(() => {
    if (editableFilterState === null) {
      return null;
    }

    const filterState: TableFilterState = {};

    colDefs.forEach(({ name, label }) => {
      filterState[name] = {
        editableState: editableFilterState[name],
        label,
      };
    });

    return filterState;
  }, [colDefs, editableFilterState]);
};

export default useFilterStateFromEditable;
