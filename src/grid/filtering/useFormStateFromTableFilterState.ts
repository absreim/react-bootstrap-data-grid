import { DateFilterState, FilterFormState, TableFilterState } from "./types";
import { useMemo } from "react";
import { dateToDatetimeInputStr, dateToInputStr } from "../util/datetime";

const useFormStateFromTableFilterState: (
  tableFilterState: TableFilterState,
) => FilterFormState = (tableFilterState) => {
  return useMemo(
    () =>
      Object.keys(tableFilterState).reduce((filterFormState, colName) => {
        const editableState = tableFilterState[colName].editableState;
        switch (editableState.type) {
          case "string": {
            filterFormState[colName] = { ...editableState };
            break;
          }
          case "number": {
            filterFormState[colName] = {
              type: "number",
              scheme: editableState.scheme,
              enabled: editableState.enabled,
              inputValue:
                editableState.numValue === null
                  ? ""
                  : String(editableState.numValue),
            };
            break;
          }
          default: {
            // date or datetime
            const partialFormState: Pick<DateFilterState, "type" | "enabled"> =
              {
                type: editableState.type,
                enabled: editableState.enabled,
              };
            const dateToStrConverter: (date: Date) => string =
              editableState.type === "date"
                ? dateToInputStr
                : dateToDatetimeInputStr;
            switch (editableState.scheme) {
              case "startFrom": {
                filterFormState[colName] = {
                  ...partialFormState,
                  scheme: "startFrom",
                  startDate:
                    editableState.startDate === null
                      ? ""
                      : dateToStrConverter(editableState.startDate),
                  endDate: "",
                };
                break;
              }
              case "endAt": {
                filterFormState[colName] = {
                  ...partialFormState,
                  scheme: "endAt",
                  startDate: "",
                  endDate:
                    editableState.endDate === null
                      ? ""
                      : dateToStrConverter(editableState.endDate),
                };
                break;
              }
              default: {
                // between
                filterFormState[colName] = {
                  ...partialFormState,
                  scheme: "between",
                  startDate:
                    editableState.startDate === null
                      ? ""
                      : dateToStrConverter(editableState.startDate),
                  endDate:
                    editableState.endDate === null
                      ? ""
                      : dateToStrConverter(editableState.endDate),
                };
                break;
              }
            }
          }
        }
        return filterFormState;
      }, {} as FilterFormState),
    [tableFilterState],
  );
};

export default useFormStateFromTableFilterState;
