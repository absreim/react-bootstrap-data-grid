"use client";

import { FC } from "react";
import Grid from "@/grid";
import {
  basicGridProps,
  blockGridProps,
  responsiveGridProps,
} from "@/app/test-info";

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <Grid {...basicGridProps} />
      </div>
      <div data-testid="responsive grid container">
        <Grid {...responsiveGridProps} />
      </div>
      <div data-testid="block grid container">
        <Grid {...blockGridProps} />
      </div>
    </>
  );
};

export default Test;
