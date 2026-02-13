import { ChangeEventHandler, FC } from "react";
import { Size } from "../types";
import classNames from "classnames";

export interface PageSizeSelectorProps {
  componentSize: Size;
  pageSizeOptions: number[];
  pageSizeIndex: number;
  handleSetPageSize: (index: number) => void;
}

const PageSizeSelector: FC<PageSizeSelectorProps> = ({
  componentSize,
  pageSizeOptions,
  pageSizeIndex,
  handleSetPageSize,
}) => {
  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const pageSizeIndex = Number(event.target.value);
    handleSetPageSize(pageSizeIndex);
  };

  return (
    <div>
      <select
        className={classNames({
          "form-select": true,
          "form-select-lg": componentSize === "large",
          "form-select-sm": componentSize === "small",
        })}
        value={pageSizeIndex}
        aria-label="Number of Rows per Page"
        onChange={onChange}
      >
        {pageSizeOptions.map((numRows, index) => (
          <option key={index} value={index}>
            {numRows}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;
