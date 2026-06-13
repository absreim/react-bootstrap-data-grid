import useControlledHover, {
  UseControlledHoverHook,
} from "../../util/useControlledHover";
import { ReactNode, useMemo } from "react";
import upArrow from "../../sorting/upArrow";
import arrowPlaceholder from "../../sorting/arrowPlaceholder";
import downArrow from "../../sorting/downArrow";
import { ColSortModel } from "../../sorting/types";

export type UseSortHeaderStatesHook =
  UseControlledHoverHook<HTMLTableCellElement> & {
    handleClick: () => void;
    sortSymbol: ReactNode;
  };

const useSortHeaderStates: (
  sortModel: ColSortModel | undefined,
) => UseSortHeaderStatesHook = (sortModel) => {
  const { isHovering, setIsHovering, handleMouseOver, handleMouseOut } =
    useControlledHover<HTMLTableCellElement>();
  const handleClick: () => void = () => {
    if (!sortModel) {
      return;
    }

    switch (sortModel.sortOrder) {
      case null: {
        sortModel.setSortOrder("asc");
        return;
      }
      case "asc": {
        sortModel.setSortOrder("desc");
        return;
      }
      case "desc": {
        sortModel.setSortOrder(null);
      }
    }
  };

  const sortSymbol = useMemo(() => {
    if (!sortModel) {
      return null;
    }

    switch (sortModel.sortOrder) {
      case null: {
        if (isHovering) {
          return upArrow(true);
        }
        return arrowPlaceholder;
      }
      case "asc": {
        return upArrow(false);
      }
      case "desc": {
        return downArrow;
      }
    }
  }, [isHovering, sortModel]);

  return {
    isHovering,
    setIsHovering,
    handleMouseOver,
    handleMouseOut,
    handleClick,
    sortSymbol,
  };
};

export default useSortHeaderStates;
