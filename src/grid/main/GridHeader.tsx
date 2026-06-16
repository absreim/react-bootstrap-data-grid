import { FC } from "react";
import getWidthStyles from "@/grid/main/getWidthStyles";
import { GridHeaderProps } from "@/grid/main/types";

const GridHeader: FC<GridHeaderProps> = ({ colInfos }) => {
  return (
    <div role="rowgroup">
      <div role="row" aria-rowindex={1}>
        {colInfos.map(({ label, name, width }, index) => (
          <div
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
