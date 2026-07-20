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
        {cols.map((col, index) => (
          <div
            className={classNames(
              "rbdg-grid-cell",
              "fw-bold",
              cellVariant &&
                cellVariant(col, index) &&
                `${CSS_PREFIX}-${cellVariant(col, index)}`,
            )}
            role="columnheader"
            key={col.name}
            aria-colindex={index + 1}
            style={getWidthStyles(col.width || DEFAULT_COL_WIDTH)}
          >
            {col.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridHeader;
