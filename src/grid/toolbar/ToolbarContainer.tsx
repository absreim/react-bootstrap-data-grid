import { ToolbarInterfaces, ToolbarOption } from "./types";
import { FC, useState } from "react";
import Toolbar from "./Toolbar";

interface ToolbarContainerProps {
  interfaces: ToolbarInterfaces;
}

const ToolbarContainer: FC<ToolbarContainerProps> = ({ interfaces }) => {
  const [option, setOption] = useState<ToolbarOption | null>(null);
  const enabledFeatures = Object.keys(interfaces).reduce(
    (prev, toolbarOption) => {
      prev[toolbarOption as ToolbarOption] = true;
      return prev;
    },
    {} as Partial<Record<ToolbarOption, boolean>>,
  );

  // TODO: mention in documentation that Bootstrap 5.3 is required due to the
  // use of the z-index utility
  return (
    <div className="vstack gap-2">
      <Toolbar
        enabledFeatures={enabledFeatures}
        option={option}
        setOption={setOption}
      />
      <div>
        {option !== null && (
          <div className="position-absolute z-1">{interfaces[option]}</div>
        )}
      </div>
    </div>
  );
};

export default ToolbarContainer;
