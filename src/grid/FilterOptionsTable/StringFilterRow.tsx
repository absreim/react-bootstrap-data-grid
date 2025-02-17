import {
  ChangeEventHandler,
  FC
} from "react";
import { StringFilterScheme, stringFilterSchemeNames, stringFilterSchemes, StringFilterState } from "../types";

interface StringFilterRowProps {
  columnLabel: string;
  filterState: StringFilterState;
  setFilterState: (filterState: StringFilterState) => void;
}

const StringFilterRow: FC<
  StringFilterRowProps
> = ({ columnLabel, filterState, setFilterState }) => {
  const handleOpChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFilterState({
      ...filterState,
      scheme: target.value as StringFilterScheme,
    });
  };

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      enabled: target.checked
    })
  }

  const handleSearchStringChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFilterState({
      ...filterState,
      searchString: target.value
    })
  }

  const { enabled, scheme, searchString } = filterState

  // TODO: Input labelling for accessibility
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
            stringFilterSchemes.map((scheme) =>
              <option key={scheme} value="contains">{stringFilterSchemeNames[scheme]}</option>
            )
          }
        </select>
      </td>
      <td>
        <input
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
