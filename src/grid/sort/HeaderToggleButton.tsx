import { SortOrder } from "../../common";
import { FC, MouseEventHandler, ReactNode } from "react";
import CaretUp from "../../common/icons/CaretUp";
import CaretDownFill from "../../common/icons/CaretDownFill";
import CaretUpFill from "../../common/icons/CaretUpFill";
import classNames from "classnames";

export interface HeaderToggleButtonProps {
  colLabel: string;
  sortOrder: SortOrder | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
  tabIndex: number;
  className?: string;
}

const HeaderToggleButton: FC<HeaderToggleButtonProps> = ({
  colLabel,
  sortOrder,
  onClick,
  tabIndex,
  className
}) => {
  function getIcon(): ReactNode {
    switch (sortOrder) {
      case "asc":
        return <CaretUpFill className="rbdg-grid-header-button-icon" />;
      case "desc":
        return <CaretDownFill className="rbdg-grid-header-button-icon" />;
      default:
        return (
          <CaretUp className="rbdg-grid-header-button-icon rbdg-grid-header-button-hover-only-icon" />
        );
    }
  }

  function getAriaLabelSuffix(): string {
    switch (sortOrder) {
      case "asc":
        return "(Sorted ascending. Click to sort descending.)";
      case "desc":
        return "(Sorted descending. Click to stop sorting.)";
      default:
        return "(Not sorted. Click to sort ascending.)";
    }
  }

  return (
    <button
      aria-label={colLabel + " " + getAriaLabelSuffix()}
      onClick={onClick}
      className={classNames("rbdg-grid-header-button", className)}
      tabIndex={tabIndex}
    >
      <span className="rbdg-grid-header-button-label">{colLabel}</span>
      {getIcon()}
    </button>
  );
};

export default HeaderToggleButton;
