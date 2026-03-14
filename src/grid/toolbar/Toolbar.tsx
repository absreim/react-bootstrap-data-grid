import { ToolbarOption } from "./types";
import { FC, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

export interface ToolbarProps {
  enabledFeatures: Partial<Record<ToolbarOption, boolean>>;
  option: ToolbarOption | null;
  setOption: (option: ToolbarOption | null) => void;
  toolbarClasses?: string[];
  activeClasses?: string[];
  inactiveClasses?: string[];
}

interface ButtonSpec {
  label: string;
  icon: ReactNode;
}

const buttonSpecs: Record<ToolbarOption, ButtonSpec> = {
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
  exporting: {
    label: "Export",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
      </svg>
    ),
  },
};

// TODO: figure out tabindex and accessibility
const Toolbar: FC<ToolbarProps> = ({
  enabledFeatures,
  option,
  setOption,
  toolbarClasses,
  activeClasses,
  inactiveClasses,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Needed to work around race condition with Playwright and SSR hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
  <div
    className={classNames(
      toolbarClasses || ["hstack", "gap-2", "justify-content-start"],
    )}
    role="toolbar"
  >
    {Object.keys(buttonSpecs)
      .filter(
        (toolbarOption) => !!enabledFeatures[toolbarOption as ToolbarOption],
      )
      .map((toolbarOption) => (
        <button
          aria-label={buttonSpecs[toolbarOption as ToolbarOption].label}
          aria-roledescription={`Grouped toggle button to show/hide ${toolbarOption} UI`}
          aria-pressed={option === toolbarOption}
          key={toolbarOption}
          className={classNames(
            ...(option === toolbarOption
              ? activeClasses || ["btn", "btn-primary", "active"]
              : inactiveClasses || ["btn", "btn-secondary"]),
          )}
          title={buttonSpecs[toolbarOption as ToolbarOption].label}
          onClick={() => {
            setOption(
              option === toolbarOption
                ? null
                : (toolbarOption as ToolbarOption),
            );
          }}
          disabled={!mounted}
        >
          {buttonSpecs[toolbarOption as ToolbarOption].icon}
        </button>
      ))}
  </div>
)};

export default Toolbar;
