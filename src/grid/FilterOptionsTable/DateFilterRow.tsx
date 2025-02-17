import { ChangeEventHandler, FC } from "react";
import {
  DateFilterScheme, dateFilterSchemeNames, dateFilterSchemes,
} from "../types";
import { DateFormFilterState } from "./types";

interface DateFilterRowProps {
  includeTime: boolean;
  columnLabel: string;
  filterState: DateFormFilterState;
  setFilterState: (filterState: DateFormFilterState) => void;
}

const DateFilterRow: FC<DateFilterRowProps> = ({ includeTime, columnLabel, filterState, setFilterState }) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
                                                                   target,
                                                                 }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as DateFilterScheme,
    });
  };

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      enabled: target.checked
    })
  }

  const handleStartValueChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      startDate: target.value
    })
  }

  const handleEndValueChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      endDate: target.value
    })
  }

  const { enabled, scheme, startDate, endDate } = filterState
  const inputType = includeTime ? "datetime-local" : "date"

  return (
    <tr>
      <td><input type="checkbox" checked={enabled} name="enabled" onChange={handleEnabledChange} /></td>
      <td>{columnLabel}</td>
      <td>{filterState.type === "date" ? "Date" : "Datetime"}</td>
      <td>
        <select
          disabled={!enabled}
          className="form-select"
          value={scheme}
          onChange={handleOpChange}
        >
          {
            dateFilterSchemes.map((scheme) => <option key={scheme} value={scheme}>{dateFilterSchemeNames[scheme]}</option>)
          }
        </select>
      </td>
      <td>
        {
          // TODO: Label both inputs in an accessible way
          scheme !== "endAt" && <input
            type={inputType}
            required={enabled}
            disabled={!enabled}
            value={startDate}
            onChange={handleStartValueChange}
          />
        }
        {
          scheme !== "startFrom" && <input
            type={inputType}
            required={enabled}
            disabled={!enabled}
            value={endDate}
            onChange={handleStartValueChange}
          />
        }
      </td>
    </tr>
  );
}

export default DateFilterRow;
