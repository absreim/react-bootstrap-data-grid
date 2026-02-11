"use client";

import { FC, useState } from "react";
import { SelectMode } from "@/grid";
import SelectModeSelector from "@/app/selection/SelectModeSelector";
import SampleSingleSelectGrid from "@/app/selection/SampleSingleSelectGrid";

const SampleSingleSelectGridContainer: FC = () => {
  const [mode, setMode] = useState<SelectMode>("both");

  return (
    <div>
      <SelectModeSelector
        mode={mode}
        setMode={setMode}
        radioGroupName={"sample-single-select-grid"}
      />
      <SampleSingleSelectGrid mode={mode} />
    </div>
  );
};

export default SampleSingleSelectGridContainer;
