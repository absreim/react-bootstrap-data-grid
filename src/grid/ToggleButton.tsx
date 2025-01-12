"use client"

import { FC } from "react";
import classNames from "classnames";

export interface ToggleButtonProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({ isActive, label, onClick }) => {
  const baseClasses: string[] = ["btn", "btn-primary"]
  const variableClasses: Record<string, boolean> = {
    active: isActive
  }

  return (
    <button type="button" className={classNames(baseClasses, variableClasses)} aria-pressed={isActive} onClick={onClick}>
      {label}
    </button>
  )
}

export default ToggleButton;
