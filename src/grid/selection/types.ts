// Selected indices are based on the original index of the input rows. If
// filtered-out items are included in the 'selected' property, there will be a
// visual indication to the user of that fact.

// One may consider designing the parent component that provides the selection
// and filtering models to reset selections whenever a new filter is applied.

// column = can only select by clicking on radio or checkbox input in special column
// row = selection column is hidden and selection can be done by clicking anywhere in a row
// both = selection can be done by either clicking on the input or row
export type SelectMode = "column" | "row" | "both";
// Equivalent to the options for the "type" field in SelectModel
export type SelectType = "single" | "multi";

export interface MultiSelectModel {
  mode: SelectMode;
  type: "multi";
  selected: number[];
  setSelected: (selected: number[]) => void;
}

export interface SingleSelectModel {
  mode: SelectMode;
  type: "single";
  selected: number | null;
  setSelected: (selected: number | null) => void;
  // string to uniquely identify the group of radio buttons
  // must be unique across all radio button groups on the web page
  groupName: string;
}

export type SelectModel = SingleSelectModel | MultiSelectModel;
export type MultiSelectModelInitialState = Omit<
  MultiSelectModel,
  "setSelected"
>;
export type SingleSelectModelInitialState = Omit<
  SingleSelectModel,
  "setSelected"
>;
