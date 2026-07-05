import { FC } from "react";
import getWidthStyles from "@/grid/main/getWidthStyles";
import { GridHeaderProps } from "@/grid/main/types";
import classNames from "classnames";
import {
  DEFAULT_COL_WIDTH,

} from "@/common/constants";
import { GRID_HEADER_DATA_TEST_ID } from "@/grid/constants";

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
        className={classNames("d-flex", "flex-row", rowVariant)}
        aria-rowindex={1}
      >
        {cols.map((col, index) => (
          <div
            className={classNames(
              "bg-body",
              "rbdg-grid-cell",
              "fw-bold",
              cellVariant && cellVariant(col),
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
