import { FC } from "react";
import getWidthStyles from "./getWidthStyles";
import { GridHeaderProps } from "./types";
import classNames from "classnames";
import { CSS_PREFIX, DEFAULT_COL_WIDTH } from "../../common/constants";
import { GRID_HEADER_DATA_TEST_ID } from "../constants";

const GridHeader: FC<GridHeaderProps> = ({
  cols,
  vertScrollable,
  rowVariant,
  cellVariant,
  focusColIndex,
  cellFocusVariant
}) => {
  return (
    <div
      data-testid={GRID_HEADER_DATA_TEST_ID}
      role="rowgroup"
      className={classNames(
        vertScrollable ? ["position-sticky", "z-1", "top-0"] : [],
      )}
    >
      <div
        role="row"
        className={classNames(
          "d-flex",
          "flex-row",
          rowVariant && `${CSS_PREFIX}-${rowVariant}`,
        )}
        aria-rowindex={1}
      >
        {cols.map((col, index) => {
          const ariaColIndex = index + 1;
          const isFocused = focusColIndex === ariaColIndex;
          const cellVariantVal = cellVariant && cellVariant(col, index);
          const cellFocusVariantVal = cellFocusVariant && cellFocusVariant(col, index);

          return (
            <div
              tabIndex={isFocused ? 0 : -1}
              className={classNames(
                "rbdg-grid-cell",
                "fw-bold",
                cellVariantVal && `${CSS_PREFIX}-${cellVariantVal}`,
                cellFocusVariantVal && `focus-ring-${cellFocusVariantVal}`,
                { "z-2": isFocused, "focus-ring": isFocused },
              )}
              role="columnheader"
              key={col.name}
              aria-colindex={ariaColIndex}
              style={getWidthStyles(col.width || DEFAULT_COL_WIDTH)}
            >
              {col.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridHeader;
