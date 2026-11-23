import { CheckboxState, SelectionInfo } from "./internalTypes";

const getSelectionCheckboxState: (
  selectionInfo: SelectionInfo,
  noRows: boolean,
) => CheckboxState = (selectionInfo, noRows) => {
  const disabledState: CheckboxState = {
    indeterminate: false,
    checked: false,
    disabled: true,
    description: "Select all (disabled)",
  };

  if (noRows) {
    return disabledState;
  }

  const { existingSelection } = selectionInfo;

  if (existingSelection === "full") {
    return {
      indeterminate: false,
      checked: true,
      disabled: false,
      description: "Deselect all rows",
    };
  }

  if (existingSelection === true || existingSelection === "partial") {
    return {
      indeterminate: true,
      checked: true,
      disabled: false,
      description: "Deselect all rows",
    };
  }

  if (existingSelection === "none") {
    return {
      indeterminate: false,
      checked: false,
      disabled: false,
      description: "Select all rows",
    };
  }

  // single select mode and none selected
  return disabledState;
};

export default getSelectionCheckboxState;
