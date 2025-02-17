import {
  DateFilterState,
  EditableTableFilterState,
  NumberFilterState,
  RowDef,
  StringFilterState
} from "../types";
import { useMemo } from "react";

const useFilter: (rows: RowDef[], filterState: EditableTableFilterState | null) => RowDef[] = (rows, filterState) => {
  return useMemo(() => {
    if (filterState === null) {
      return rows;
    }

    return rows.filter((row) => {
      function checkIfPassesStringFilter(value: string, state: StringFilterState): boolean {
        switch (state.scheme) {
          case "contains": {
            return value.includes(state.searchString)
          }
          case "startsWith": {
            return value.startsWith(state.searchString)
          }
          default: {
            return value.endsWith(state.searchString)
          }
        }
      }

      function checkIfPassesNumberFilter(value: number, state: NumberFilterState): boolean {
        const numValue = Number(state.numValue) // Note that a blank string becomes 0
        switch (state.scheme) {
          case "equals":
            return value === numValue
          case "greaterThan":
            return value > numValue
          case "lessThan":
            return value < numValue
          case "greaterOrEqual":
            return value >= numValue
          default:
            return value <= numValue
        }
      }

      function checkIfPassesDateFilter(value: Date, state: DateFilterState): boolean {
        switch (state.scheme) {
          case "startFrom":
            return state.startDate === null || value >= state.startDate
          case "endAt":
            return state.endDate === null || value <= state.endDate
          case "between":
            return state.startDate === null || state.endDate === null ||
              value >= state.startDate && value <= state.endDate
        }
      }

      const columnNames = Object.keys(row)
      for (const columnName of columnNames) {
        if (!(columnName in filterState)) {
          continue
        }

        const columnFilterState = filterState[columnName]
        switch (columnFilterState.type) {
          case "string": {
            if (!checkIfPassesStringFilter(row[columnName] as string, columnFilterState)) {
              return false
            }
            break
          }
          case "number": {
            if (!checkIfPassesNumberFilter(row[columnName] as number, columnFilterState)) {
              return false
            }
            break
          }
          default: {
            if (!checkIfPassesDateFilter(row[columnName] as Date, columnFilterState)) {
              return false
            }
          }
        }
      }

      return true
    })
  }, [rows, filterState])
}

export default useFilter;
