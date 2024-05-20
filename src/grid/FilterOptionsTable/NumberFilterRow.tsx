import { ChangeEventHandler, FC } from "react";
import {
  NumberFilterScheme,
  numberFilterSchemeNames,
  numberFilterSchemes,
  NumberFilterState,
} from "../types";
import { NumberFormFilterState } from "./types";

interface NumberFilterRowProps {
  columnLabel: string;
  filterState: NumberFormFilterState;
  setFilterState: (filterState: NumberFormFilterState) => void;
}

const NumberFilterRow: FC<NumberFilterRowProps> = ({
  columnLabel,
  filterState,
  setFilterState,
}) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as NumberFilterScheme,
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

  const handleNumInputValueChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      inputValue: target.value,
    });
  };

  const { enabled, scheme, inputValue } = filterState;

  // TODO: Input labelling for accessibility
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
      <td>Number</td>
      <td>
        <select
          disabled={!enabled}
          className="form-select"
          value={scheme}
          onChange={handleOpChange}
        >
          {numberFilterSchemes.map((scheme) => (
            <option key={scheme} value={scheme}>
              {numberFilterSchemeNames[scheme]}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="form-control"
          type="number"
          required={enabled}
          disabled={!enabled}
          value={inputValue}
          onChange={handleNumInputValueChange}
        />
      </td>
    </tr>
  );
};

export default NumberFilterRow;
