import { ChangeEventHandler, FC, ReactNode } from "react";
import FilterRow, { CommonFilterRowStyleProps } from "./FilterRow";
import classNames from "classnames";
import {
  StringFilterScheme,
  stringFilterSchemeNames,
  StringFilterState,
} from "./types";

type StringFilterRowProps = {
  columnLabel: string;
  filterState: StringFilterState;
  setFilterState: (filterState: StringFilterState) => void;
  schemeSelectClasses: string[];
  enableInputClasses: string[];
  searchStringInputClasses: string[];
} & CommonFilterRowStyleProps;

const StringFilterRow: FC<StringFilterRowProps> = ({
  columnLabel,
  filterState,
  setFilterState,
  schemeSelectClasses,
  enableInputClasses,
  searchStringInputClasses,
  tdClasses,
  trClasses,
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

  const valueInputLabel = `${columnLabel} Column Filter Value`;

  const searchStringInputCellContents = (
    <input
      name={valueInputLabel}
      aria-label={valueInputLabel}
      className={classNames("form-control", searchStringInputClasses)}
      required={enabled}
      disabled={!enabled}
      value={searchString}
      onChange={handleSearchStringChange}
    />
  );

  return (
    <FilterRow
      columnLabel={columnLabel}
      typeLabel="String"
      enabled={enabled}
      enabledChangeHandler={handleEnabledChange}
      currentScheme={scheme}
      handleSchemeChange={handleOpChange}
      schemesToLabels={stringFilterSchemeNames}
      searchStringInputCellContents={searchStringInputCellContents}
      trClasses={trClasses}
      tdClasses={tdClasses}
      inputClasses={enableInputClasses}
      selectClasses={schemeSelectClasses}
    />
  );
};

export default StringFilterRow;
