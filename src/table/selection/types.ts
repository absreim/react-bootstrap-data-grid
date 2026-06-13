// Selected indices are based on the id of the input rows. If
// filtered-out items are included in the 'selected' property, there will be a
// visual indication to the user of that fact.

// One may consider designing the parent component that provides the selection
// and filtering models to reset selections whenever a new filter is applied.

// column = can only select by clicking on radio or checkbox input in special column
// row = selection column is hidden and selection can be done by clicking anywhere in a row
// both = selection can be done by either clicking on the input or row
import { RowId } from "../types";

export type SelectMode = "column" | "row" | "both";
// Equivalent to the options for the "type" field in SelectModel
export type SelectType = "single" | "multi";

interface BaseSelectModel {
  mode: SelectMode;
  selectColWidth?: number;
}

export type MultiSelectModel = BaseSelectModel & {
  type: "multi";
  selected: RowId[];
  setSelected: (selected: RowId[]) => void;
};

export type SingleSelectModel = BaseSelectModel & {
  type: "single";
  selected: RowId | null;
  setSelected: (selected: RowId | null) => void;
  // String to uniquely identify the group of radio buttons
  // must be unique across all radio button groups on the web page.
  // No longer needed to be specified since useId can be used to generate an ID.
  groupName?: string;
};

export type SelectModel = SingleSelectModel | MultiSelectModel;

export type MultiExistingSelection = "full" | "partial" | "none";

export interface SingleSelectionInfo {
  selectType: "single";
  existingSelection: boolean;
}

export interface MultiSelectionInfo {
  selectType: "multi";
  existingSelection: "full" | "partial" | "none";
}

export type SelectionInfo = SingleSelectionInfo | MultiSelectionInfo;
