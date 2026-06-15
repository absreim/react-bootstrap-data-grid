import { FC, ReactNode, SubmitEventHandler, useState } from "react";
import StringFilterRow from "./StringFilterRow";
import {
  EditableTableFilterState,
  FilterFormRowState,
  FilterFormState,
  TableFilterState,
} from "./types";
import NumberFilterRow from "./NumberFilterRow";
import useFilterFormState from "./useFilterFormState";
import DateFilterRow from "./DateFilterRow";
import classNames from "classnames";
import { FilterInputTableStyleModel } from "../../table/styling/types";

export interface FilterOptionsTableProps {
  filterState: TableFilterState;
  setFilterState: (filterState: EditableTableFilterState) => void;
  closeFormCallback: () => void;
  caption?: string;
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
  caption,
  styleModel,
  closeFormCallback,
}) => {
  const formFilterState = useFilterFormState(filterState);
  const [formState, setFormState] = useState(formFilterState);

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
              ariaRowIndex={index + 2}
              key={colName}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
              schemeSelectClasses={
                styleModel?.schemeSelectionInput &&
                styleModel?.schemeSelectionInput(index)
              }
              enableInputClasses={
                styleModel?.enablementInput &&
                styleModel?.enablementInput(index)
              }
              searchStringInputClasses={
                styleModel?.searchStringInput &&
                styleModel?.searchStringInput(index)
              }
              trClasses={styleModel?.tbodyTr && styleModel?.tbodyTr(index)}
              tdClasses={(colIndex) =>
                styleModel?.tbodyTd && styleModel?.tbodyTd(index, colIndex)
              }
            />
          );
        }
        case "number": {
          return (
            <NumberFilterRow
              ariaRowIndex={index + 2}
              key={colName}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
              schemeSelectClasses={
                styleModel?.schemeSelectionInput &&
                styleModel?.schemeSelectionInput(index)
              }
              enableInputClasses={
                styleModel?.enablementInput &&
                styleModel?.enablementInput(index)
              }
              numberInputClasses={
                styleModel?.numberInput && styleModel?.numberInput(index)
              }
              trClasses={styleModel?.tbodyTr && styleModel?.tbodyTr(index)}
              tdClasses={(colIndex) =>
                styleModel?.tbodyTd && styleModel?.tbodyTd(index, colIndex)
              }
            />
          );
        }
        default: {
          // date or datetime
          return (
            <DateFilterRow
              ariaRowIndex={index + 2}
              key={colName}
              includeTime={colFilterState.type === "datetime"}
              columnLabel={colLabel}
              filterState={colFilterState}
              setFilterState={getColStateSetter(colName)}
              schemeSelectClasses={
                styleModel?.schemeSelectionInput &&
                styleModel?.schemeSelectionInput(index)
              }
              enableInputClasses={
                styleModel?.enablementInput &&
                styleModel?.enablementInput(index)
              }
              startDateInputClasses={
                styleModel?.startDateInput && styleModel.startDateInput(index)
              }
              endDateInputClasses={
                styleModel?.endDateInput && styleModel.endDateInput(index)
              }
              trClasses={styleModel?.tbodyTr && styleModel?.tbodyTr(index)}
              tdClasses={(colIndex) =>
                styleModel?.tbodyTd && styleModel?.tbodyTd(index, colIndex)
              }
            />
          );
        }
      }
    });

  const onSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();

    const editableTableFilterState =
      convertFilterFormStateToEditableState(formState);
    setFilterState(editableTableFilterState);
    closeFormCallback();
  };

  return (
    <form onSubmit={onSubmit} className={classNames(styleModel?.form)}>
      <table className={classNames(styleModel?.table || "table")}>
        {caption && (
          <caption className={classNames(styleModel?.caption)}>
            {caption}
          </caption>
        )}
        <thead className={classNames(styleModel?.thead)}>
          <tr className={classNames(styleModel?.theadTr)}>
            {["Enabled", "Column", "Type", "Operator", "Value"].map(
              (colName, index) => (
                <th
                  key={index}
                  className={classNames(
                    styleModel?.theadTh && styleModel.theadTh(index),
                  )}
                >
                  {colName}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className={classNames(styleModel?.tbody)}>{getRows()}</tbody>
      </table>
      <div className="hstack justify-content-end gap-2">
        <button
          className="btn btn-secondary"
          onClick={closeFormCallback}
          type="button"
        >
          Cancel
        </button>
        <button
          className={classNames(
            styleModel?.submitButton || ["btn", "btn-primary"],
          )}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FilterOptionsTable;
