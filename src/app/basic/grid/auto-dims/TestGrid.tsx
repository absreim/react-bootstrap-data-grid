"use client";

import { FC } from "react";
import { cols, rows } from "@/app/basic/test-data";
import Grid from "@/grid";

const TestGrid: FC = () => <Grid rows={rows} cols={cols} />;

export default TestGrid;
