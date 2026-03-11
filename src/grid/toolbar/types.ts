import { ReactNode } from "react";

export type ToolbarOption = "filtering";

export type ToolbarInterfaces = Partial<Record<ToolbarOption, ReactNode>>;
