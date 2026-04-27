import { ToolbarOption } from "./types";
import {
  FC,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

const Toolbar: FC<ToolbarProps> = ({
  enabledFeatures,
  option,
  setOption,
  toolbarClasses,
  activeClasses,
  inactiveClasses,
}) => {
  const enabledOptions = useMemo(
    () =>
      Object.keys(buttonSpecs).filter(
        (toolbarOption) => !!enabledFeatures[toolbarOption as ToolbarOption],
      ) as ToolbarOption[],
    [enabledFeatures],
  );
  const [focusableOption, setFocusableOption] = useState<ToolbarOption | null>(
    enabledOptions[0] || null,
  );
  const divRef = useRef<HTMLDivElement | null>(null);

  // Deals with cases where selected option is no longer available due to enabledFeatures prop getting changed.
  const actualOption = useMemo(() => {
    if (focusableOption === null || !enabledOptions.includes(focusableOption)) {
      return enabledOptions[0] || null;
    }

    return focusableOption;
  }, [enabledOptions, focusableOption]);

  const onKeydown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (actualOption === null) {
      return;
    }

    const currentIndex = enabledOptions.findIndex(
      (option) => option === actualOption,
    );
    if (currentIndex === -1) {
      // Should not happen due normalization of the value by the actualOption useMemo hook.
      // This branch is put here anyway for explanatory purposes.
      return;
    }

    if (event.code === "ArrowLeft" && currentIndex - 1 < 0) {
      setFocusableOption(enabledOptions[enabledOptions.length - 1]);
      return;
    }

    if (event.code === "ArrowLeft" && currentIndex - 1 >= 0) {
      setFocusableOption(enabledOptions[currentIndex - 1]);
      return;
    }

    if (
      event.code === "ArrowRight" &&
      currentIndex + 1 >= enabledOptions.length
    ) {
      setFocusableOption(enabledOptions[0]);
      return;
    }

    if (
      event.code === "ArrowRight" &&
      currentIndex + 1 < enabledOptions.length
    ) {
      setFocusableOption(enabledOptions[currentIndex + 1]);
      return;
    }
  };

  useEffect(() => {
    if (actualOption === null) {
      return;
    }

    if (divRef.current === null) {
      return;
    }

    if (!divRef.current.contains(document.activeElement)) {
      return;
    }

    const focusTarget: HTMLButtonElement | null = divRef.current.querySelector(
      `:scope > button[data-toolbar-option="${actualOption}"]`,
    );

    if (focusTarget) {
      focusTarget.focus();
    }
  }, [actualOption]);

  return (
    <div
      ref={divRef}
      className={classNames(
        toolbarClasses || ["hstack", "gap-2", "justify-content-start", "px-2"],
      )}
      role="toolbar"
      onKeyDown={onKeydown}
    >
      {enabledOptions.map((toolbarOption) => (
        <button
          tabIndex={actualOption === toolbarOption ? 0 : -1}
          data-toolbar-option={toolbarOption}
          aria-label={buttonSpecs[toolbarOption as ToolbarOption].label}
          aria-roledescription={`Grouped toggle button to show/hide ${toolbarOption} UI`}
          aria-pressed={option === toolbarOption}
          key={toolbarOption}
          className={classNames(
            ...(option === toolbarOption
              ? activeClasses || ["btn", "btn-outline-secondary", "active"]
              : inactiveClasses || ["btn", "btn-outline-secondary"]),
          )}
          title={buttonSpecs[toolbarOption as ToolbarOption].label}
          onClick={() => {
            setFocusableOption(toolbarOption);
            setOption(
              option === toolbarOption
                ? null
                : (toolbarOption as ToolbarOption),
            );
          }}
        >
          {buttonSpecs[toolbarOption as ToolbarOption].icon}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
