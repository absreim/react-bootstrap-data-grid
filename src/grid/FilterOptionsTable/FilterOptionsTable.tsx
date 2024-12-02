import { FC, ReactNode } from "react";
import {
  ConcreteFilterState,
  EditableTableFilterState,
  TableFilterState,
} from "../types";
import StringFilterRow from "./StringFilterRow";

interface FilterOptionsTableProps {
  tableFilterState: TableFilterState;
  setTableFilterState: (state: EditableTableFilterState) => void;
}

const FilterOptionsTable: FC<FilterOptionsTableProps> = ({
  tableFilterState,
  setTableFilterState,
}) => {
  const getRows: () => ReactNode[] = () =>
    Object.keys(tableFilterState).map((colName) => {
      function getColStateSetter<T extends ConcreteFilterState>(
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
              columnName={colName}
              columnLabel={colFilterState.metadata.label}
              filterState={colFilterState.editableState}
              setFilterState={getColStateSetter(colName)}
            />
          );
        }
        default: {
          throw new Error(
            `Unknown column type ${colFilterState.editableState.type}`,
          );
        }
      }
    });

  return <table className="table">{getRows()}</table>;
};

export default FilterOptionsTable;
