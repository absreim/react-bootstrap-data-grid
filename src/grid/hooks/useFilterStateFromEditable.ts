import { useMemo } from 'react';
import { ColDef, EditableTableFilterState, TableFilterState } from "../types";

const useFilterStateFromEditable: (colDefs: ColDef[], editableFilterState: EditableTableFilterState | null) => TableFilterState | null = (colDefs, editableFilterState) => {
  return useMemo(() => {
    if (editableFilterState === null) {
      return null
    }

    const labelsByColumn: Record<string, string> = {}
    colDefs.forEach(({ name, label }) => {
      labelsByColumn[name] = label
    })


  }, [colDefs, editableFilterState])
}

export default useFilterStateFromEditable;
