import { ChangeEventHandler, FC } from "react";
import {
  NumberFilterScheme,
  numberFilterSchemeNames,
  numberFilterSchemes,
  NumberFilterState,
} from "../types";

interface NumberFilterRowProps {
  columnLabel: string;
  filterState: NumberFilterState;
  setFilterState: (filterState: NumberFilterState) => void;
}

const NumberFilterRow: FC<NumberFilterRowProps> = ({ columnLabel, filterState, setFilterState }) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
                                                                   target,
                                                                 }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as NumberFilterScheme,
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
      numInputValue: target.value
    })
  }

  const { enabled, scheme, numInputValue } = filterState

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
            numberFilterSchemes.map((scheme) => <option key={scheme} value={scheme}>{numberFilterSchemeNames[scheme]}</option>)
          }
        </select>
      </td>
      <td>
        <input
          type="number"
          required={enabled}
          disabled={!enabled}
          value={numInputValue}
          onChange={handleNumInputValueChange}
        />
      </td>
    </tr>
  );
}

export default NumberFilterRow;
