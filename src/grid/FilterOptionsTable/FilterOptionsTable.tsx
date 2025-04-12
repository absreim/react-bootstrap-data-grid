import { FC, FormEventHandler, ReactNode, useState } from "react";
import { EditableTableFilterState, TableFilterState } from "../types";
import StringFilterRow from "./StringFilterRow";
import { FilterFormRowState, FilterFormState } from "./types";
import { datetimeInputStrToUtc } from "../util/datetime";
import NumberFilterRow from "./NumberFilterRow";
import useFormStateFromTableFilterState from "./useFormStateFromTableFilterState";
import DateFilterRow from "./DateFilterRow";

interface FilterOptionsTableProps {
  filterState: TableFilterState;
  setFilterState: (filterState: EditableTableFilterState) => void;
}

const convertFilterFormStateToEditableState: (
  filterFormState: FilterFormState,
) => EditableTableFilterState = (filterFormState) =>
  Object.keys(filterFormState).reduce((editableState, colName) => {
    const rowFilterFormState = filterFormState[colName];
    switch (rowFilterFormState.type) {
      case "string": {
        editableState[colName] = { ...rowFilterFormState };
        break;
      }
      case "number": {
        editableState[colName] = {
          type: rowFilterFormState.type,
          enabled: rowFilterFormState.enabled,
          scheme: rowFilterFormState.scheme,
          numValue:
            rowFilterFormState.inputValue === ""
              ? null
              : Number(rowFilterFormState.inputValue),
        };
        break;
      }
      default: {
        // date or datetime
        const partialFilterState = {
          type: rowFilterFormState.type,
          enabled: rowFilterFormState.enabled,
        };
        const strModifierFn: (str: string) => string =
          rowFilterFormState.type === "date"
            ? (str) => str
            : datetimeInputStrToUtc;
        const inputStrToDate: (str: string) => Date | null = (str) =>
          str === "" ? null : new Date(strModifierFn(str));
        switch (rowFilterFormState.scheme) {
          case "startFrom": {
            editableState[colName] = {
              ...partialFilterState,
              scheme: rowFilterFormState.scheme,
              startDate: inputStrToDate(rowFilterFormState.startDate),
            };
            break;
          }
          case "endAt": {
            editableState[colName] = {
              ...partialFilterState,
              scheme: rowFilterFormState.scheme,
              endDate: inputStrToDate(rowFilterFormState.endDate),
            };
            break;
          }
          default: {
            editableState[colName] = {
              ...partialFilterState,
              scheme: rowFilterFormState.scheme,
              startDate: inputStrToDate(rowFilterFormState.startDate),
              endDate: inputStrToDate(rowFilterFormState.endDate),
            };
          }
        }
      }
    }
    return editableState;
  }, {} as EditableTableFilterState);

const FilterOptionsTable: FC<FilterOptionsTableProps> = ({
  filterState,
  setFilterState,
}) => {
  const formFilterState = useFormStateFromTableFilterState(filterState);
  const [formState, setFormState] = useState(formFilterState);

  const getRows: () => ReactNode[] = () =>
    Object.keys(formState).map((colName) => {
      function getColStateSetter(
        colName: string,
      ): (rowState: FilterFormRowState) => void {
        return (rowState) =>
          setFormState({
            ...formState,
            [colName]: rowState,
          });
      }

      const colLabel = filterState[colName].label;
      const colFilterState = formState[colName];
      switch (colFilterState.type) {
        case "string": {
          return (
            <StringFilterRow
              key={colName}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
            />
          );
        }
        case "number": {
          return (
            <NumberFilterRow
              key={colName}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
            />
          );
        }
        default: {
          // date or datetime
          return (
            <DateFilterRow
              key={colName}
              includeTime={colFilterState.type === "datetime"}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
            />
          );
        }
      }
    });

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const editableTableFilterState =
      convertFilterFormStateToEditableState(formState);
    setFilterState(editableTableFilterState);
  };

  return (
    <form onSubmit={onSubmit}>
      <table className="table">
        <thead>
          <tr>
            <th>Enabled</th>
            <th>Column</th>
            <th>Type</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>
      <button className="btn btn-secondary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FilterOptionsTable;
