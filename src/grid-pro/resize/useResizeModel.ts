import { ProColDef } from "../types";
import { DisplayMode } from "../../grid";
import { ColResizeModel, ResizeModel } from "./types";
import { useMemo, useState } from "react";

const useResizeModel: (
  cols: Pick<ProColDef, "resizeable" | "width" | "name">[],
  display: DisplayMode | undefined,
) => ResizeModel = (cols, display) => {
  const getInitWidthByName = () =>
    cols.reduce(
      (prev, { width, name }) => {
        const getEffectiveWidth: () => number = () => {
          if (typeof width === "object") {
            return width.width;
          }

          if (width === undefined) {
            return 100;
          }

          return width;
        };

        prev[name] = getEffectiveWidth();
        return prev;
      },
      {} as Record<string, number>,
    );
  const [widthByName, setWidthByName] =
    useState<Record<string, number>>(getInitWidthByName());

  return useMemo(
    () =>
      cols.reduce((prev, { resizeable, width, name }) => {
        const getEffectiveWidth: () => number | undefined = () => {
          if (typeof width === "object") {
            return width.width;
          }

          if (display === "block" && resizeable) {
            return widthByName[name];
          }

          return width;
        };

        const getWidthSetter: () => ColResizeModel["setWidth"] = () => {
          if (display !== "block" || !resizeable) {
            return undefined;
          }

          if (typeof width === "object") {
            return width.setWidth;
          }

          return (newWidth: number) =>
            setWidthByName((prevState) => ({
              ...prevState,
              [name]: newWidth,
            }));
        };

        prev[name] = {
          width: getEffectiveWidth(),
          setWidth: getWidthSetter(),
        };
        return prev;
      }, {} as ResizeModel),
    [cols, display, widthByName],
  );
};

export default useResizeModel;
