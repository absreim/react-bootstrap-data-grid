import { ToolbarOption } from "./types";
import { FC, ReactNode, useState } from "react";
import Toolbar from "./Toolbar";

interface ToolbarContainerProps {
  interfaces: Partial<Record<ToolbarOption, ReactNode>>;
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

  return (
    <div className="vstack gap-2">
      <Toolbar
        enabledFeatures={enabledFeatures}
        option={option}
        setOption={setOption}
      />
      {option !== null && (
        <div className="position-relative z-1">{interfaces[option]}</div>
      )}
    </div>
  );
};

export default ToolbarContainer;
