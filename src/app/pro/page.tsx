"use client";

import { FC } from "react";
import GridPro from "@/grid-pro";
import { basicGridProps, blockGridProps } from "@/app/test-info";

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <GridPro {...basicGridProps} />
      </div>
      <div data-testid="block grid container">
        <GridPro {...blockGridProps} />
      </div>
    </>
  );
};

export default Test;
