import { ToolbarOption } from "./types";
import { FC, ReactNode } from "react";
import classNames from "classnames";

export interface ToolbarProps {
  option: ToolbarOption | null;
  setOption: (option: ToolbarOption | null) => void;
  activeClasses?: string[];
  inactiveClasses?: string[];
}

interface ButtonInfo {
  label: string;
  icon: ReactNode;
}

const buttonsInfo: Record<ToolbarOption, ButtonInfo> = {
  filtering: {
    label: "Filtering",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
      </svg>
    ),
  },
};

// TODO: figure out tabindex and accessibility
const Toolbar: FC<ToolbarProps> = ({
  option,
  setOption,
  activeClasses,
  inactiveClasses,
}) => (
  <div className="hstack gap-2 justify-content-end">
    {Object.keys(buttonsInfo).map((toolbarOption) => (
      <button
        aria-label={buttonsInfo[toolbarOption as ToolbarOption].label}
        aria-roledescription={`Grouped toggle button to show/hide ${toolbarOption} UI`}
        aria-pressed={option === toolbarOption}
        key={toolbarOption}
        className={classNames(
          ...(option === toolbarOption
            ? activeClasses || ["btn-primary", "active"]
            : inactiveClasses || ["btn-secondary"]),
        )}
        title={buttonsInfo[toolbarOption as ToolbarOption].label}
        onClick={() => {
          setOption(
            option === toolbarOption ? null : (toolbarOption as ToolbarOption),
          );
        }}
      >
        {buttonsInfo[toolbarOption as ToolbarOption].icon}
      </button>
    ))}
  </div>
);

export default Toolbar;
