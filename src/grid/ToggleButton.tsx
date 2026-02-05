"use client";

import { FC } from "react";
import classNames from "classnames";

export interface ToggleButtonProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
  classes?: string[];
}

const ToggleButton: FC<ToggleButtonProps> = ({
  isActive,
  label,
  onClick,
  classes,
}) => {
  const baseClasses: string[] = ["btn"];
  const variableClasses: Record<string, boolean> = {
    active: isActive,
  };

  return (
    <button
      type="button"
      className={classNames(
        baseClasses,
        variableClasses,
        classes || ["btn-primary"],
      )}
      aria-pressed={isActive}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToggleButton;
