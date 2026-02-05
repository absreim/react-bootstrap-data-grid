import { useMemo } from "react";
import { ColDef, EditableTableFilterState, TableFilterState } from "../types";

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
