import { ColDef, ColNameToWidth } from "../";
import { useMemo } from "react";

const useColNameToWidth: (cols: ColDef[]) => ColNameToWidth = (cols) =>
  useMemo(() => {
    const map: Record<string, number | undefined> = {};
    cols.forEach(({ name, width }) => (map[name] = width));
    return map;
  }, [cols]);

export default useColNameToWidth;
