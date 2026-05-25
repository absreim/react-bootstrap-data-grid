import { useMemo } from "react";
import { ReorderStyleModel, ReorderStyles } from "./types";

const useReorderStyles: (
  styleModel: ReorderStyleModel | undefined,
) => ReorderStyles = (styleModel) => {
  const draggedRowClasses = useMemo(
    () => styleModel?.draggedRowClasses || ["rbdg-reorder-dragged-row"],
    [styleModel?.draggedRowClasses],
  );

  const draggedRowPredecessorClasses = useMemo(
    () =>
      styleModel?.draggedRowPredecessorClasses || [
        "rbdg-reorder-dragged-row-pred",
      ],
    [styleModel?.draggedRowPredecessorClasses],
  );

  const topBorderRowClasses = useMemo(
    () =>
      styleModel?.topBorderRowClasses || ["rbdg-reorder-above-drag-target-row"],
    [styleModel?.topBorderRowClasses],
  );

  const bottomBorderRowClasses = useMemo(
    () =>
      styleModel?.bottomBorderRowClasses || [
        "rbdg-reorder-below-drag-target-row",
      ],
    [styleModel?.bottomBorderRowClasses],
  );

  const ghostDivClasses = useMemo(
    () => styleModel?.ghostDivClasses || ["border", "rbdg-drag-ghost"],
    [styleModel?.ghostDivClasses],
  );

  return {
    draggedRowClasses,
    draggedRowPredecessorClasses,
    topBorderRowClasses,
    bottomBorderRowClasses,
    ghostDivClasses,
  };
};

export default useReorderStyles;
