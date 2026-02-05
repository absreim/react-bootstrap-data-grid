import { ChangeEventHandler, FC } from "react";
import { NumberFilterScheme, numberFilterSchemeNames } from "../types";
import { NumberFormFilterState } from "./types";
import FilterRow, { CommonFilterRowStyleProps } from "./FilterRow";
import classNames from "classnames";

export type NumberFilterRowProps = {
  columnLabel: string;
  filterState: NumberFormFilterState;
  setFilterState: (filterState: NumberFormFilterState) => void;
  schemeSelectClasses: string[];
  enableInputClasses: string[];
  numberInputClasses: string[];
} & CommonFilterRowStyleProps;

const NumberFilterRow: FC<NumberFilterRowProps> = ({
  columnLabel,
  filterState,
  setFilterState,
  schemeSelectClasses,
  enableInputClasses,
  numberInputClasses,
  tdClasses,
  trClasses,
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

  const valueInputLabel = `${columnLabel} Column Filter Value`;

  const searchStringInputCellContents = (
    <input
      name={valueInputLabel}
      aria-label={valueInputLabel}
      className={classNames("form-control", numberInputClasses)}
      type="number"
      required={enabled}
      disabled={!enabled}
      value={inputValue}
      onChange={handleNumInputValueChange}
    />
  );

  return (
    <FilterRow
      columnLabel={columnLabel}
      typeLabel="Number"
      enabled={enabled}
      enabledChangeHandler={handleEnabledChange}
      currentScheme={scheme}
      handleSchemeChange={handleOpChange}
      schemesToLabels={numberFilterSchemeNames}
      searchStringInputCellContents={searchStringInputCellContents}
      trClasses={trClasses}
      tdClasses={tdClasses}
      inputClasses={enableInputClasses}
      selectClasses={schemeSelectClasses}
    />
  );
};

export default NumberFilterRow;
