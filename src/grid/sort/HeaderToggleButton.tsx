import { SortOrder } from "../../common";
import { FC, MouseEventHandler, ReactNode } from "react";
import UpArrow from "../../common/sorting/UpArrow";
import DownArrow from "../../common/sorting/DownArrow";

export interface HeaderToggleButtonProps {
  colLabel: string;
  sortOrder: SortOrder | null;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const HeaderToggleButton: FC<HeaderToggleButtonProps> = ({ colLabel, sortOrder, onClick }) => {
  function getIcon(): ReactNode {
    switch (sortOrder) {
      case "asc":
        return <UpArrow className="rbdg-grid-header-button-icon" />;
      case "desc":
        return <DownArrow className="rbdg-grid-header-button-icon" />;
      default:
        return (
          <UpArrow className="rbdg-grid-header-button-icon rbdg-grid-header-button-hover-only-icon" />
        );
    }
  }

  return (
    <button onClick={onClick} className="rbdg-grid-header-button">
      {colLabel}
      {getIcon()}
    </button>
  )
}

export default HeaderToggleButton;
