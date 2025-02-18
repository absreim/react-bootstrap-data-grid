import { FC, ReactNode } from "react";
import {
  FilterState,
  EditableTableFilterState,
  FilterModel, StartDateFilterState, EndDateFilterState
} from "../types";
import StringFilterRow from "./StringFilterRow";
import { FilterFormState } from "./types";
import { datetimeInputStrToUtc } from "../util/datetime";

interface FilterOptionsTableProps {
  filterModel: FilterModel
}

const convertFilterFormStateToEditableState: (filterFormState: FilterFormState) => EditableTableFilterState = (filterFormState) => (
  Object.keys(filterFormState).reduce((editableState, colName) => {
    const rowFilterFormState = filterFormState[colName]
    switch (rowFilterFormState.type) {
      case "string": {
        editableState[colName] = { ...rowFilterFormState }
        break
      }
      case "number": {
        editableState[colName] = {
          type: rowFilterFormState.type,
          enabled: rowFilterFormState.enabled,
          scheme: rowFilterFormState.scheme,
          numValue: rowFilterFormState.inputValue === "" ? null : Number(rowFilterFormState.inputValue)
        }
        break
      }
      default: { // date or datetime
        const partialFilterState = {
          type: rowFilterFormState.type,
          enabled: rowFilterFormState.enabled,
          scheme: rowFilterFormState.scheme,
        }
        const strModifierFn: (str: string) => string = rowFilterFormState.type === "date" ? (str) => str : datetimeInputStrToUtc
        const inputStrToDate: (str: string) => (Date | null) = (str) => (
          str === "" ? null : new Date(strModifierFn(str))
        )
        switch (rowFilterFormState.scheme) {
          case "startFrom": {
            editableState[colName] = {
              ...partialFilterState,
              startDate: inputStrToDate(rowFilterFormState.startDate)
            } as StartDateFilterState
            break
          }
          case "endAt": {
            editableState[colName] = {
              ...partialFilterState,
              endDate: inputStrToDate(rowFilterFormState.endDate)
            } as EndDateFilterState
            break
          }
          default: {
            editableState[colName] = {
              ...partialFilterState,
              startDate: inputStrToDate(rowFilterFormState.startDate),
              endDate: inputStrToDate(rowFilterFormState.endDate)
            }
          }
        }
      }
    }
    return editableState
  }, {} as EditableTableFilterState)
)

const FilterOptionsTable: FC<FilterOptionsTableProps> = ({ filterModel: {
  tableFilterState,
  setTableFilterState,
} }) => {
  const getRows: () => ReactNode[] = () =>
    Object.keys(tableFilterState).map((colName) => {
      function getColStateSetter<T extends FilterState>(
        colName: string,
      ): (filterState: T) => void {
        const editableState: EditableTableFilterState = Object.keys(
          tableFilterState,
        ).reduce(
          (accumObj, currentColName) => ({
            ...accumObj,
            [currentColName]: tableFilterState[currentColName].editableState,
          }),
          {},
        );
        return (filterState) =>
          setTableFilterState({
            ...editableState,
            [colName]: filterState,
          });
      }

      const colFilterState = tableFilterState[colName];
      switch (colFilterState.editableState.type) {
        case "string": {
          return (
            <StringFilterRow
              key={colName}
              columnLabel={colFilterState.metadata.label}
              filterState={colFilterState.editableState}
              setFilterState={getColStateSetter(colName)}
            />
          );
        }
        // TODO: filter row UIs for other types
        default: {
          throw new Error(
            `Unknown column type ${colFilterState.editableState.type}`,
          );
        }
      }
    });

  return <table className="table">
    <thead>
      <tr>
        <th>Enabled</th>
        <th>Column</th>
        <th>Type</th>
        <th>Operator</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {getRows()}
    </tbody>
  </table>;
};

export default FilterOptionsTable;
