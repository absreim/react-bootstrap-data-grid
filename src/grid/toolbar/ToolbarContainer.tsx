import { ToolbarInterfaces, ToolbarOption } from "./types";
import { FC, useState } from "react";
import Toolbar from "./Toolbar";
import { ToolbarStyleModel } from "../styling/types";
import classNames from "classnames";

interface ToolbarContainerProps {
  interfaces: ToolbarInterfaces;
  styleModel?: ToolbarStyleModel;
}

const ToolbarContainer: FC<ToolbarContainerProps> = ({
  interfaces,
  styleModel,
}) => {
  const [option, setOption] = useState<ToolbarOption | null>(null);
  const enabledFeatures = Object.keys(interfaces).reduce(
    (prev, toolbarOption) => {
      prev[toolbarOption as ToolbarOption] =
        !!interfaces[toolbarOption as ToolbarOption];
      return prev;
    },
    {} as Partial<Record<ToolbarOption, boolean>>,
  );

  // TODO: mention in documentation that Bootstrap 5.3 is required due to the
  // use of the z-index utility
  return (
    <div className="vstack" data-testid="toolbar container">
      <Toolbar
        enabledFeatures={enabledFeatures}
        option={option}
        setOption={setOption}
        toolbarClasses={styleModel?.toolbar}
        activeClasses={styleModel?.activeButton}
        inactiveClasses={styleModel?.inactiveButton}
      />
      <div className="position-relative">
        {option !== null && (
          <div
            data-testid="toolbar feature interface content container"
            className={classNames(
              styleModel?.interfaceContainer || [
                "position-absolute",
                "z-1",
                "bg-body",
                "border",
                "shadow",
                "p-2",
              ],
            )}
          >
            {interfaces[option]}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolbarContainer;
