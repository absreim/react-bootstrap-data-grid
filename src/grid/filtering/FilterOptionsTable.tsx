import { FC, FormEventHandler, ReactNode, useMemo, useState } from "react";
import {
  EditableTableFilterState,
  FilterInputTableStyleModel,
  TableFilterState,
} from "../types";
import StringFilterRow from "./StringFilterRow";
import { FilterFormRowState, FilterFormState } from "./types";
import NumberFilterRow from "./NumberFilterRow";
import useFormStateFromTableFilterState from "./useFormStateFromTableFilterState";
import DateFilterRow from "./DateFilterRow";
import classNames from "classnames";
import { unwrapFilterInputTableStyleModel } from "../styling/styleModelUnwrappers";

interface FilterOptionsTableProps {
  filterState: TableFilterState;
  setFilterState: (filterState: EditableTableFilterState) => void;
  styleModel?: FilterInputTableStyleModel;
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
        const inputStrToDate: (str: string) => Date | null = (str) =>
          str === "" ? null : new Date(str);
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
  styleModel,
}) => {
  const formFilterState = useFormStateFromTableFilterState(filterState);
  const [formState, setFormState] = useState(formFilterState);

  const unwrappedStyleModel = useMemo(
    () => unwrapFilterInputTableStyleModel(styleModel),
    [styleModel],
  );

  const getRows: () => ReactNode[] = () =>
    Object.keys(formState).map((colName, index) => {
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
              schemeSelectClasses={unwrappedStyleModel.schemeSelectionInput}
              enableInputClasses={unwrappedStyleModel.enablementInput}
              searchStringInputClasses={unwrappedStyleModel.searchStringInput}
              trClasses={unwrappedStyleModel.tbodyTr(index)}
              tdClasses={(colIndex) =>
                unwrappedStyleModel.tbodyTd(index, colIndex)
              }
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
              schemeSelectClasses={unwrappedStyleModel.numberInput}
              enableInputClasses={unwrappedStyleModel.enablementInput}
              numberInputClasses={unwrappedStyleModel.numberInput}
              trClasses={unwrappedStyleModel.tbodyTr(index)}
              tdClasses={(colIndex) =>
                unwrappedStyleModel.tbodyTd(index, colIndex)
              }
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
              schemeSelectClasses={unwrappedStyleModel.schemeSelectionInput}
              enableInputClasses={unwrappedStyleModel.enablementInput}
              startDateInputClasses={unwrappedStyleModel.startDateInput}
              endDateInputClasses={unwrappedStyleModel.endDateInput}
              trClasses={unwrappedStyleModel.tbodyTr(index)}
              tdClasses={(colIndex) =>
                unwrappedStyleModel.tbodyTd(index, colIndex)
              }
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

  // TODO: consider using an accordion to show and hide this component
  // TODO: pass down styles to tbody rows
  return (
    <form onSubmit={onSubmit}>
      <table className={classNames("table", ...unwrappedStyleModel.table)}>
        <thead className={classNames(...unwrappedStyleModel.thead)}>
          <tr className={classNames(...unwrappedStyleModel.theadTr)}>
            {["Enabled", "Column", "Type", "Operator", "Value"].map(
              (colName, index) => (
                <th
                  key={index}
                  className={classNames(...unwrappedStyleModel.theadTh(index))}
                >
                  {colName}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className={classNames(...unwrappedStyleModel.tbody)}>
          {getRows()}
        </tbody>
      </table>
      <button
        className={classNames(
          "btn",
          "btn-secondary",
          ...unwrappedStyleModel.editSecondaryButton,
        )}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FilterOptionsTable;
