import { ChangeEventHandler, FC, useMemo } from "react";
import { DateFilterScheme, dateFilterSchemeNames } from "../types";
import { DateFormFilterState } from "./types";
import { nanoid } from "nanoid/non-secure";
import FilterRow, { CommonFilterRowStyleProps } from "./FilterRow";
import classNames from "classnames";

export type DateFilterRowProps = {
  includeTime: boolean;
  columnLabel: string;
  filterState: DateFormFilterState;
  setFilterState: (filterState: DateFormFilterState) => void;
  schemeSelectClasses: string[];
  enableInputClasses: string[];
  startDateInputClasses: string[];
  endDateInputClasses: string[];
} & CommonFilterRowStyleProps;

const DateFilterRow: FC<DateFilterRowProps> = ({
  includeTime,
  columnLabel,
  filterState,
  setFilterState,
  schemeSelectClasses,
  enableInputClasses,
  startDateInputClasses,
  endDateInputClasses,
  tdClasses,
  trClasses,
}) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as DateFilterScheme,
    });
  };

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      enabled: target.checked,
    });
  };

  const handleStartValueChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      startDate: target.value,
    });
  };

  const handleEndValueChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      endDate: target.value,
    });
  };

  const { enabled, scheme, startDate, endDate } = filterState;
  const inputType = includeTime ? "datetime-local" : "date";

  const inputId = useMemo(() => nanoid(), []);
  const startDateInputId = `$startDate-${inputId}`;
  const endDateInputId = `$endDate-${inputId}`;

  const startDateInputLabel = `${columnLabel} Column Filter Start Date`;
  const endDateInputLabel = `${columnLabel} Column Filter End Date`;

  const searchStringInputCellContents = (
    <>
      {scheme !== "endAt" && (
        <>
          {scheme === "between" && (
            <label htmlFor={startDateInputId}>Start Date</label>
          )}
          <input
            id={startDateInputId}
            className={classNames("form-control", startDateInputClasses)}
            type={inputType}
            required={enabled}
            disabled={!enabled}
            value={startDate}
            onChange={handleStartValueChange}
            aria-label={startDateInputLabel}
          />
        </>
      )}
      {scheme !== "startFrom" && (
        <>
          {scheme === "between" && (
            <label htmlFor={endDateInputId}>End Date</label>
          )}
          <input
            id={endDateInputId}
            className={classNames("form-control", endDateInputClasses)}
            type={inputType}
            required={enabled}
            disabled={!enabled}
            value={endDate}
            onChange={handleEndValueChange}
            aria-label={endDateInputLabel}
          />
        </>
      )}
    </>
  );

  return (
    <FilterRow
      columnLabel={columnLabel}
      typeLabel={filterState.type === "date" ? "Date" : "Datetime"}
      enabled={enabled}
      enabledChangeHandler={handleEnabledChange}
      currentScheme={scheme}
      handleSchemeChange={handleOpChange}
      schemesToLabels={dateFilterSchemeNames}
      searchStringInputCellContents={searchStringInputCellContents}
      trClasses={trClasses}
      tdClasses={tdClasses}
      inputClasses={enableInputClasses}
      selectClasses={schemeSelectClasses}
    />
  );
};

export default DateFilterRow;
