import { SortOrder } from "../../common";
import { FC, MouseEventHandler, ReactNode } from "react";
import CaretUp from "../../common/icons/CaretUp";
import CaretDownFill from "../../common/icons/CaretDownFill";
import CaretUpFill from "../../common/icons/CaretUpFill";

export interface HeaderToggleButtonProps {
  colLabel: string;
  sortOrder: SortOrder | null;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const HeaderToggleButton: FC<HeaderToggleButtonProps> = ({ colLabel, sortOrder, onClick }) => {
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

  return (
    <button onClick={onClick} className="rbdg-grid-header-button">
      <span className="rbdg-grid-header-button-label">{colLabel}</span>
      {getIcon()}
    </button>
  );
}

export default HeaderToggleButton;
