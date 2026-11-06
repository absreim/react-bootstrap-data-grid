import { ChangeEventHandler, FC, useId } from "react";
import classNames from "classnames";
import { Size } from "../";

export interface PageSizeSelectorProps {
  componentSize: Size;
  pageSizeOptions: number[];
  pageSizeIndex: number;
  handleSetPageSize: (index: number) => void;
  showTextLabel: boolean;
}

const labelText = "Rows per page";

const PageSizeSelector: FC<PageSizeSelectorProps> = ({
  componentSize,
  pageSizeOptions,
  pageSizeIndex,
  handleSetPageSize,
  showTextLabel,
}) => {
  const id = useId();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const pageSizeIndex = Number(event.target.value);
    handleSetPageSize(pageSizeIndex);
  };

  function getTextSizeClass() {
    switch (componentSize) {
      case "small":
        return "rbdg-input-label-sm";
      case "large":
        return "rbdg-input-label-lg";
      default:
        return undefined;
    }
  }

  return (
    <div
      data-testid="rbdg-page-size-selector"
      className="d-flex align-items-center gap-2 flex-shrink-0"
    >
      {showTextLabel && (
        <label
          htmlFor={id}
          className={classNames("flex-shrink-0", getTextSizeClass())}
        >
          {labelText}
        </label>
      )}
      <select
        aria-label={showTextLabel ? undefined : labelText}
        id={id}
        name="rowsPerPage"
        className={classNames(
          {
            "form-select": true,
            "form-select-lg": componentSize === "large",
            "form-select-sm": componentSize === "small",
          },
          "flex-shrink-0",
          "w-auto",
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
  );
};

export default PageSizeSelector;
