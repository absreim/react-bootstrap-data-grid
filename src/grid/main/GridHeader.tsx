import { FC } from "react";
import getWidthStyles from "@/grid/main/getWidthStyles";
import { GridHeaderProps } from "@/grid/main/types";
import classNames from "classnames";

const GridHeader: FC<GridHeaderProps> = ({ colInfos, vertScrollable }) => {
  return (
    <div
      role="rowgroup"
      className={classNames(
        vertScrollable ? ["position-sticky", "z-1", "top-0"] : [],
      )}
    >
      <div role="row" className="d-flex flex-row" aria-rowindex={1}>
        {colInfos.map(({ label, name, width }, index) => (
          <div
            className="bg-body rbdg-grid-cell fw-bold"
            role="columnheader"
            key={name}
            aria-colindex={index + 1}
            style={getWidthStyles(width)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridHeader;
