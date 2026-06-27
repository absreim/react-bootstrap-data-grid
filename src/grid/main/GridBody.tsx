import { FC } from 'react';
import { GridBodyProps } from "@/grid/main/types";
import getWidthStyles from "@/grid/main/getWidthStyles";
import classNames from "classnames";

const GridBody: FC<GridBodyProps> = ({ rowInfos, divider }) => {
  return (
    <div role="rowgroup" className={classNames({
      "rbdg-grid-group-divider": !!divider
    })}>
      {rowInfos.map(({ id, prePaginationIndex, cellInfos }) => (
        <div
          role="row"
          key={id}
          aria-rowindex={prePaginationIndex + 2}
          className="d-flex flex-row"
        >
          {cellInfos.map(({ formattedValue, width, columnName }) => (
            <div
              key={columnName}
              style={getWidthStyles(width)}
              role="gridcell"
              className="rbdg-grid-cell"
            >
              {formattedValue}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridBody;
