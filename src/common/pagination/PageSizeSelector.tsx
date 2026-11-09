import { ChangeEventHandler, FC, useId } from "react";
import classNames from "classnames";
import { Size } from "../";

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
  const id = useId();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const pageSizeIndex = Number(event.target.value);
    handleSetPageSize(pageSizeIndex);
  };

  return (
    <div
      data-testid="rbdg-page-size-selector"
      className="d-flex align-items-center gap-2"
    >
      <label htmlFor={id} className="flex-shrink-0">
        Rows per page
      </label>
      <div>
        <select
          id={id}
          name="rowsPerPage"
          className={classNames(
            {
              "form-select": true,
              "form-select-lg": componentSize === "large",
              "form-select-sm": componentSize === "small",
            },
            "flex-shrink-0",
          )}
          value={pageSizeIndex}
          onChange={onChange}
        >
          {pageSizeOptions.map((numRows, index) => (
            <option key={index} value={index}>
              {numRows}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PageSizeSelector;
