import { InterfaceNodeGenerator, ToolbarOption } from "./internalTypes";
import { FC, useCallback, useMemo, useState } from "react";
import Toolbar from "./Toolbar";
import classNames from "classnames";
import { ToolbarStyleModel } from "../styling/types";
import { TOOLBAR_CONTAINER_TEST_ID } from "../constants";

interface ToolbarContainerProps {
  interfaceGen: InterfaceNodeGenerator;
  styleModel?: ToolbarStyleModel;
}

const ToolbarContainer: FC<ToolbarContainerProps> = ({
  interfaceGen,
  styleModel,
}) => {
  const [option, setOption] = useState<ToolbarOption | null>(null);
  const closeUiCallback = useCallback(() => setOption(null), []);
  const interfaces = useMemo(
    () => interfaceGen(closeUiCallback),
    [closeUiCallback, interfaceGen],
  );
  const enabledFeatures = useMemo(() => {
    return Object.keys(interfaces).reduce(
      (prev, toolbarOption) => {
        prev[toolbarOption as ToolbarOption] =
          !!interfaces[toolbarOption as ToolbarOption];
        return prev;
      },
      {} as Partial<Record<ToolbarOption, boolean>>,
    );
  }, [interfaces]);

  // Z-index of 4 is needed to go on top of Bootstrap pagination links that have
  // a z-index of 3.
  // The z-index of 4 is applied as a style prop here to avoid a breaking
  // change. As part of the next major release, move this setting the common
  // SCSS file.
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
            data-testid={TOOLBAR_CONTAINER_TEST_ID}
            style={{
              zIndex: 4,
            }}
            className={classNames(
              styleModel?.interfaceContainer || [
                "position-absolute",
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
