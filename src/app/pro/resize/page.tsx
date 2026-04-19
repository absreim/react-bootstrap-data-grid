"use client";

import { FC } from "react";
import ResizeTestHarness from "@/app/pro/resize/ResizeTestHarness";

const Page: FC = () => {
  return (
    <>
      <ResizeTestHarness />
      <div
        data-testid="leftDragTarget"
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          left: 300,
          background: "black",
        }}
      ></div>
      <div
        data-testid="rightDragTarget"
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          left: 700,
          background: "black",
        }}
      ></div>
    </>
  );
}

export default Page;
