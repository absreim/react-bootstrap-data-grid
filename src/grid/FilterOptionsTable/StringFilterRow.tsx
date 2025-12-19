import { ChangeEventHandler, FC } from "react";
import {
  StringFilterScheme,
  stringFilterSchemeNames,
  stringFilterSchemes,
  StringFilterState,
} from "../types";

interface StringFilterRowProps {
  columnLabel: string;
  filterState: StringFilterState;
  setFilterState: (filterState: StringFilterState) => void;
}

const StringFilterRow: FC<StringFilterRowProps> = ({
  columnLabel,
  filterState,
  setFilterState,
}) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as StringFilterScheme,
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

  const handleSearchStringChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      searchString: target.value,
    });
  };

  const { enabled, scheme, searchString } = filterState;

  const checkboxLabel = `${columnLabel} Column Filter Toggle`;
  const opSelectLabel = `${columnLabel} Column Filter Operator Selection`;
  const valueInputLabel = `${columnLabel} Column Filter Value`;

  return (
    <tr>
      <td>
        <input
          name={checkboxLabel}
          aria-label={checkboxLabel}
          type="checkbox"
          checked={enabled}
          onChange={handleEnabledChange}
        />
      </td>
      <td>{columnLabel}</td>
      <td>String</td>
      <td>
        <select
          name={opSelectLabel}
          aria-label={opSelectLabel}
          disabled={!enabled}
          className="form-select"
          value={scheme}
          onChange={handleOpChange}
        >
          {stringFilterSchemes.map((scheme) => (
            <option key={scheme} value={scheme}>
              {stringFilterSchemeNames[scheme]}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          name={valueInputLabel}
          aria-label={valueInputLabel}
          className="form-control"
          required={enabled}
          disabled={!enabled}
          value={searchString}
          onChange={handleSearchStringChange}
        />
      </td>
    </tr>
  );
};

export default StringFilterRow;
