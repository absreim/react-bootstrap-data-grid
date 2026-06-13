"use client";

import { FC } from "react";
import Table from "@/table";
import { basicGridProps, blockGridProps } from "@/app/test-info";

const Test: FC = () => {
  return (
    <>
      <div data-testid="functioning grid container">
        <Table {...basicGridProps} />
      </div>
      <div data-testid="block grid container">
        <Table {...blockGridProps} />
      </div>
    </>
  );
};

export default Test;
