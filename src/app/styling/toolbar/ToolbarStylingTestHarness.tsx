"use client";

import Grid, { StyleModel } from "@/grid";
import { FC } from "react";
import { cols, rows } from "@/app/styling/multitype-test-data";
import GridPro from "@/grid-pro";

const styleModel: StyleModel = {
  toolbarStyleModel: {
    activeButton: ["active-button-test-class"],
    inactiveButton: ["inactive-button-test-class"],
    toolbar: ["toolbar-test-class"],
    interfaceContainer: ["interface-container-test-class"],
  },
};

const ToolbarStylingTestHarness: FC<{ pro?: boolean }> = ({ pro }) => {
  if (pro) {
    return (
      <GridPro
        rows={rows}
        cols={cols}
        filterModel={{ type: "uncontrolled" }}
        styleModel={styleModel}
        useToolbar={true}
      />
    );
  }

  return (
    <Grid
      rows={rows}
      cols={cols}
      filterModel={{ type: "uncontrolled" }}
      styleModel={styleModel}
      useToolbar={true}
    />
  );
};

export default ToolbarStylingTestHarness;
