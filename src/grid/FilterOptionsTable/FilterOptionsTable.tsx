import { FC, ReactNode } from "react";
import {
  FilterState,
  EditableTableFilterState,
  FilterModel,
} from "../types";
import StringFilterRow from "./StringFilterRow";

interface FilterOptionsTableProps {
  filterModel: FilterModel
}

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
