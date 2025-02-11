import { ChangeEventHandler, FC } from "react";
import {
  DateFilterScheme, dateFilterSchemeNames, dateFilterSchemes,
  DateFilterState,
} from "../types";

interface DateFilterRowProps {
  includeTime: boolean;
  columnLabel: string;
  filterState: DateFilterState;
  setFilterState: (filterState: DateFilterState) => void;
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

  const handleNumInputValueChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      startDate: target.value
    })
  }

  const { enabled, scheme, numInputValue } = filterState
  const inputType = includeTime ? "datetime-local" : "date"

  return (
    <tr>
      <td><input type="checkbox" checked={enabled} name="enabled" onChange={handleEnabledChange} /></td>
      <td>{columnLabel}</td>
      <td>String</td>
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

        }
        <input
          type={inputType}
          required={enabled}
          disabled={!enabled}
          value={numInputValue}
          onChange={handleNumInputValueChange}
        />
      </td>
    </tr>
  );
}

export default DateFilterRow;
