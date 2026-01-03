"use client";

import { FC, useState } from "react";
import { SelectMode } from "@/grid";
import SelectModeSelector from "@/app/selection/SelectModeSelector";
import SampleMultiSelectGrid from "@/app/selection/SampleMultiSelectGrid";

const SampleMultiSelectGridContainer: FC = () => {
  const [mode, setMode] = useState<SelectMode>("both");

  return (
    <div>
      <SelectModeSelector
        mode={mode}
        setMode={setMode}
        radioGroupName={"sample-multiselect-grid"}
      />
      <SampleMultiSelectGrid mode={mode} />
    </div>
  );
};

export default SampleMultiSelectGridContainer;
