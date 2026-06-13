import { ChangeEventHandler, FC } from "react";
import {
  NumberFilterScheme,
  numberFilterSchemeNames,
  NumberFormFilterState,
} from "./types";
import FilterRow, { CommonFilterRowStyleProps } from "./FilterRow";
import classNames from "classnames";

export type NumberFilterRowProps = {
  ariaRowIndex: number;
  columnLabel: string;
  filterState: NumberFormFilterState;
  setFilterState: (filterState: NumberFormFilterState) => void;
  schemeSelectClasses: string[] | null | undefined;
  enableInputClasses: string[] | null | undefined;
  numberInputClasses: string[] | null | undefined;
} & CommonFilterRowStyleProps;

const NumberFilterRow: FC<NumberFilterRowProps> = ({
  ariaRowIndex,
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
      className={classNames(numberInputClasses || "form-control")}
      type="number"
      required={enabled}
      disabled={!enabled}
      value={inputValue}
      onChange={handleNumInputValueChange}
    />
  );

  return (
    <FilterRow
      ariaRowIndex={ariaRowIndex}
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
