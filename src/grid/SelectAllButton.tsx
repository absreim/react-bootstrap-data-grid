import { SelectType } from "./types";
import { FC } from "react";
import { Button } from "react-bootstrap";

interface SelectAllButtonProps {
  onClick: () => void;
  selectType: SelectType;
  existingSelection: boolean;
}

const getButtonLabel: (selectMode: SelectType, existingSelection: boolean) => string = (selectMode, existingSelection) => {
  if (existingSelection) {
    return "Deselect All"
  }

  if (selectMode === "multi" && !existingSelection) {
    return "Select All"
  }

  // Single select mode and none selected means that the button is disabled
  return "None Selected"
}

// TODO: make this button SVG-icon based and similar to the one used by MUI-X
const SelectAllButton: FC<SelectAllButtonProps> = ({ onClick, selectType, existingSelection }) => {
  return (
    <Button onClick={onClick} disabled={selectType === "single" && !existingSelection}>
      {getButtonLabel(selectType, existingSelection)}
    </Button>
  )
}

export default SelectAllButton;
