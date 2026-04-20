import { RowDef, RowId } from "../types";
import { MouseEventHandler, useCallback, useId, useMemo } from "react";
import {
  MultiExistingSelection,
  MultiSelectModel,
  SelectionInfo,
  SelectModel,
} from "../selection/types";
import { SelectionInputModel } from "../selection/SelectionInput";
import isSubset from "../util/isSubset";

export interface UseGridSelectionFnsHook {
  selectedSet: Set<RowId>;
  rowsAreSelectable: boolean | undefined;
  selectionInfo: SelectionInfo | null;
  selectAllOnClick: () => void;
  getSelectHandler: (index: RowId) => () => void;
  getSelectInputModel: (
    id: RowId,
    selectModel: SelectModel,
  ) => SelectionInputModel;
  getRowClickHandler: (index: RowId) => MouseEventHandler<HTMLTableRowElement>;
  getAriaSelectedValue: (id: RowId) => "true" | "false" | undefined;
}

const useGridSelectionFns: (
  selectModel: SelectModel | undefined,
  rows: RowDef[],
) => UseGridSelectionFnsHook = (selectModel, rows) => {
  const selectionExists = useMemo(() => {
    if (!selectModel) {
      return false;
    }

    if (selectModel.type === "single") {
      return selectModel.selected !== null;
    }

    return (selectModel as MultiSelectModel).selected.length > 0;
  }, [selectModel]);

  const selectAllOnClick: () => void = useCallback(() => {
    if (!selectModel) {
      return;
    }

    if (selectionExists && selectModel.type === "single") {
      selectModel.setSelected(null);
      return;
    }

    if (selectionExists && selectModel.type === "multi") {
      selectModel.setSelected([]);
      return;
    }

    if (!selectionExists && selectModel.type === "multi") {
      const allRowIndices = rows.map((_, index) => index);
      selectModel.setSelected(allRowIndices);
    }

    // Button should be disabled in the case of selectionExists &&
    // selectModel.type === "single", so function execution should never get
    // to this point.
  }, [rows, selectModel, selectionExists]);

  const getSelectHandler: (index: RowId) => () => void = (index) => () => {
    if (!selectModel) {
      return;
    }

    if (selectModel.type === "single") {
      selectModel.setSelected(index);
      return;
    }

    selectModel.setSelected(selectModel.selected.concat(index));
  };

  const getDeselectHandler: (index: RowId) => () => void = (index) => () => {
    if (!selectModel || selectModel.type === "single") {
      return;
    }

    selectModel.setSelected(
      selectModel.selected.filter((num) => num !== index),
    );
  };

  // used to group radio buttons for selection
  const gridId = useId();
  const getSelectInputModel: (
    id: RowId,
    selectModel: SelectModel,
  ) => SelectionInputModel = (id, selectModel) => {
    if (selectModel.type === "single") {
      return {
        type: "radio",
        name: selectModel.groupName || gridId,
      };
    }

    return {
      type: "checkbox",
      deselectCallback: getDeselectHandler(id),
    };
  };

  const selectedSet = useMemo(() => {
    const set = new Set<RowId>();
    if (selectModel && selectModel.type === "multi") {
      selectModel.selected.forEach((value) => set.add(value));
    }
    if (
      selectModel &&
      selectModel.type === "single" &&
      selectModel.selected !== null
    ) {
      set.add(selectModel.selected);
    }

    return set;
  }, [selectModel]);

  const rowsAreSelectable = selectModel && selectModel.mode !== "column";

  const selectionInfo: SelectionInfo | null = useMemo(() => {
    if (!selectModel) {
      return null;
    }

    if (selectModel.type === "single") {
      return {
        selectType: "single",
        existingSelection: selectionExists,
      };
    }

    const getMultiExistingSelection: (
      selectionExists: boolean,
      rows: RowDef[],
    ) => MultiExistingSelection = (selectionExists, rows) => {
      const rowIndices = rows.map((_, index) => index);

      // Note that isFullSelection is true if there are no rows at all. In that case, the return value of this function
      // should be "none", not "full".
      const isFullSelection = isSubset(rowIndices, selectModel.selected!);

      if (!selectionExists) {
        return "none";
      }

      if (isFullSelection) {
        return "full";
      }

      return "partial";
    };

    return {
      selectType: "multi",
      existingSelection: getMultiExistingSelection(selectionExists, rows),
    };
  }, [selectModel, selectionExists, rows]);

  const getRowClickHandler: (
    index: RowId,
  ) => MouseEventHandler<HTMLTableRowElement> = (index) => () => {
    if (!rowsAreSelectable) {
      return;
    }

    if (selectedSet.has(index)) {
      getDeselectHandler(index)();
      return;
    }

    getSelectHandler(index)();
  };

  const getAriaSelectedValue: (id: RowId) => "true" | "false" | undefined = (
    id,
  ) => {
    if (!selectModel) {
      return undefined;
    }

    return String(selectedSet.has(id)) as "true" | "false";
  };

  return {
    selectedSet,
    rowsAreSelectable,
    selectionInfo,
    selectAllOnClick,
    getSelectHandler,
    getSelectInputModel,
    getRowClickHandler,
    getAriaSelectedValue,
  };
};

export default useGridSelectionFns;
