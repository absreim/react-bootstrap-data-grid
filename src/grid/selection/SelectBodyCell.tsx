import { FC } from "react";
import { SelectBodyCellProps } from "./internalTypes";

const SelectBodyCell: FC<SelectBodyCellProps> = ({
  selectMode,
  isSelected,
  handleSelect,
  className,
  tabIndex,
  radioGroup,
}) => {
  return (
    <div role="gridcell" className={className} tabIndex={tabIndex}>
      <input
        className="form-check-input"
        type={selectMode === "multi" ? "checkbox" : "radio"}
        onChange={handleSelect}
        checked={isSelected}
        radioGroup={radioGroup}
      />
    </div>
  );
};

export default SelectBodyCell;
