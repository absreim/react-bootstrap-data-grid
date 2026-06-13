"use client";

import Table, { StyleModel } from "@/table";
import { FC } from "react";
import { cols, rows } from "@/app/styling/multitype-test-data";
import TablePro from "@/table-pro";

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
      <TablePro
        rows={rows}
        cols={cols}
        filterModel={{ type: "uncontrolled" }}
        styleModel={styleModel}
      />
    );
  }

  return (
    <Table
      rows={rows}
      cols={cols}
      filterModel={{ type: "uncontrolled" }}
      styleModel={styleModel}
    />
  );
};

export default ToolbarStylingTestHarness;
