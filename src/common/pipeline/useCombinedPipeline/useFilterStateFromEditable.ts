import { useMemo } from "react";
import { EditableFilterState } from "../../filtering/types";
import { ColDef } from "../../types";
import { FilterState } from "../../filtering/internalTypes";

const useFilterStateFromEditable: (
  colDefs: ColDef[],
  editableFilterState: EditableFilterState | null,
) => FilterState | null = (colDefs, editableFilterState) => {
  return useMemo(() => {
    if (editableFilterState === null) {
      return null;
    }

    const filterState: FilterState = {};

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
