import { ReactNode } from "react";

export type ToolbarOption = "filtering" | "exporting";

export type ToolbarInterfaces = Partial<Record<ToolbarOption, ReactNode>>;
