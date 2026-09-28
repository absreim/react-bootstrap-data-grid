import useControlledHover, {
  UseControlledHoverHook,
} from "../util/useControlledHover";
import { ReactNode, useMemo } from "react";
import UpArrow from "./UpArrow";
import ArrowPlaceholder from "./ArrowPlaceholder";
import DownArrow from "./DownArrow";

import { ColSortModel } from "./internalTypes";

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
          return <UpArrow grayed />;
        }
        return <ArrowPlaceholder />;
      }
      case "asc": {
        return <UpArrow grayed={false} />;
      }
      case "desc": {
        return <DownArrow />;
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
