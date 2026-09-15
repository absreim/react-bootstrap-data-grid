/**
 * Indicates whether a grid or table has all, some, or now rows selected when
 * in multiselect mode.
 *
 * @internal
 */
export type MultiExistingSelection = "full" | "partial" | "none";

/**
 * Indicates the selection mode of a grid or table is in single selection mode.
 * Also whether a selection exists.
 *
 * @internal
 */
export interface SingleSelectionInfo {
  selectType: "single";
  existingSelection: boolean;
}

/**
 * Indicates the selection mode of a grid or table is in multiselect mode.
 * Also indicates whether a full, partial, or no selection exists.
 *
 * @internal
 */
export interface MultiSelectionInfo {
  selectType: "multi";
  existingSelection: "full" | "partial" | "none";
}

/**
 * Indicates the selection mode of a grid or table and contains metadata
 * on whether selections exist.
 *
 * @internal
 */
export type SelectionInfo = SingleSelectionInfo | MultiSelectionInfo;
