import { ChangeEventHandler, FC, useMemo } from "react";
import {
  DateFilterScheme,
  dateFilterSchemeNames,
  dateFilterSchemes,
} from "../types";
import { DateFormFilterState } from "./types";
import { nanoid } from "nanoid/non-secure";

interface DateFilterRowProps {
  includeTime: boolean;
  columnLabel: string;
  filterState: DateFormFilterState;
  setFilterState: (filterState: DateFormFilterState) => void;
}

const DateFilterRow: FC<DateFilterRowProps> = ({
  includeTime,
  columnLabel,
  filterState,
  setFilterState,
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

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={enabled}
          name="enabled"
          onChange={handleEnabledChange}
        />
      </td>
      <td>{columnLabel}</td>
      <td>{filterState.type === "date" ? "Date" : "Datetime"}</td>
      <td>
        <select
          disabled={!enabled}
          className="form-select"
          value={scheme}
          onChange={handleOpChange}
        >
          {dateFilterSchemes.map((scheme) => (
            <option key={scheme} value={scheme}>
              {dateFilterSchemeNames[scheme]}
            </option>
          ))}
        </select>
      </td>
      <td>
        {scheme !== "endAt" && (
          <>
            {scheme === "between" && (
              <label htmlFor={startDateInputId}>Start Date</label>
            )}
            <input
              id={startDateInputId}
              className="form-control"
              type={inputType}
              required={enabled}
              disabled={!enabled}
              value={startDate}
              onChange={handleStartValueChange}
              aria-label="Start Date"
            />
          </>
        )}
        {scheme !== "startFrom" && (
          <>
            {scheme === "between" && (
              <label htmlFor={endDateInputId}>End Date</label>
            )}
            <input
              className="form-control"
              type={inputType}
              required={enabled}
              disabled={!enabled}
              value={endDate}
              onChange={handleEndValueChange}
              aria-label="End Date"
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default DateFilterRow;
