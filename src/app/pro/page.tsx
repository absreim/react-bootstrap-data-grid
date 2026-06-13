"use client";

import { FC } from "react";
import TablePro from "@/table-pro";
import { basicGridProps, blockGridProps } from "@/app/test-info";

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <TablePro {...basicGridProps} />
      </div>
      <div data-testid="block grid container">
        <TablePro {...blockGridProps} />
      </div>
    </>
  );
};

export default Test;
