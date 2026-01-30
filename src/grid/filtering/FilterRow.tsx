import { ChangeEventHandler, ReactNode } from "react";
import classNames from "classnames";

export interface FilterRowProps<FilterScheme extends string> {
  columnLabel: string;
  typeLabel: string;
  enabled: boolean;
  enabledChangeHandler: ChangeEventHandler<HTMLInputElement>;
  currentScheme: string;
  handleSchemeChange: ChangeEventHandler<HTMLSelectElement>;
  schemesToLabels: Record<FilterScheme, string>;
  searchStringInputCellContents: ReactNode;
  trClasses: string[];
  tdClasses: (colIndex: number) => string[];
  inputClasses: string[];
  selectClasses: string[];
}

export type CommonFilterRowStyleProps = Pick<
  FilterRowProps<string>,
  "trClasses" | "tdClasses"
>;

export function FilterRow<FilterScheme extends string = string>(
  props: FilterRowProps<FilterScheme>,
): ReactNode {
  const {
    columnLabel,
    typeLabel,
    enabled,
    enabledChangeHandler,
    currentScheme,
    handleSchemeChange,
    schemesToLabels,
    searchStringInputCellContents,
    trClasses,
    tdClasses,
    inputClasses,
    selectClasses,
  } = props;

  const checkboxLabel = `${columnLabel} Column Filter Toggle`;
  const opSelectLabel = `${columnLabel} Column Filter Operator Selection`;

  return (
    <tr className={classNames(trClasses)}>
      <td className={classNames(tdClasses(0))}>
        <input
          className={classNames(inputClasses)}
          name={checkboxLabel}
          aria-label={checkboxLabel}
          type="checkbox"
          checked={enabled}
          onChange={enabledChangeHandler}
        />
      </td>
      <td className={classNames(tdClasses(1))}>{columnLabel}</td>
      <td className={classNames(tdClasses(2))}>{typeLabel}</td>
      <td className={classNames(tdClasses(3))}>
        <select
          name={opSelectLabel}
          aria-label={opSelectLabel}
          disabled={!enabled}
          className={classNames("form-select", ...selectClasses)}
          value={currentScheme}
          onChange={handleSchemeChange}
        >
          {Object.keys(schemesToLabels).map((scheme) => (
            <option key={scheme} value={scheme}>
              {schemesToLabels[scheme as FilterScheme]}
            </option>
          ))}
        </select>
      </td>
      <td className={classNames(tdClasses(4))}>
        {searchStringInputCellContents}
      </td>
    </tr>
  );
}

export default FilterRow;
