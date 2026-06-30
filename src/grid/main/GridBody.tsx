import { FC } from "react";
import { GridBodyProps } from "@/grid/main/types";
import getWidthStyles from "@/grid/main/getWidthStyles";
import classNames from "classnames";
import { DEFAULT_COL_WIDTH } from "@/common/constants";

const GridBody: FC<GridBodyProps> = ({
  augFormattedRows,
  cols,
  rowVariant,
  cellVariant,
}) => {
  return (
    <div
      role="rowgroup"
    >
      {augFormattedRows.map((row) => (
        <div
          role="row"
          key={row.id}
          aria-rowindex={row.prePaginationIndex + 2}
          className={classNames(
            "d-flex",
            "flex-row",
            rowVariant && rowVariant(row),
          )}
        >
          {row.contents.map(({ formattedValue, width }, index) => (
            <div
              key={cols[index].name}
              style={getWidthStyles(width || DEFAULT_COL_WIDTH)}
              role="gridcell"
              className={classNames(
                "rbdg-grid-cell",
                cellVariant && cellVariant(row.contents[index], row),
              )}
            >
              {formattedValue}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridBody;
