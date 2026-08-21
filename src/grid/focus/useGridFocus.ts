import {
  KeyboardEventHandler,
  PointerEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FocusCoordinates } from "./types";

const startingCoordinates: FocusCoordinates = {
  ariaColIndex: 1,
  ariaRowIndex: 1,
};

export interface GridFocusOutput {
  effectiveCoords: FocusCoordinates;
  gridClickHandler: PointerEventHandler<HTMLDivElement>;
  gridKeydownHandler: KeyboardEventHandler<HTMLDivElement>;
}

const useGridFocus: (
  gridRef: RefObject<HTMLDivElement | null>,
  numRows: number, // Number that includes the header row
  numCols: number,
) => GridFocusOutput = (gridRef, numRows, numCols) => {
  const [coords, setCoords] = useState<FocusCoordinates>(startingCoordinates);

  // Even though row and col count can be gotten from attributes, it needs to
  // be a prop here to update effective coordinates at the appropriate times.
  const effectiveCoords: FocusCoordinates = useMemo(
    () => ({
      ariaColIndex: Math.min(coords.ariaColIndex, numCols),
      ariaRowIndex: Math.min(coords.ariaRowIndex, numRows),
    }),
    [coords.ariaColIndex, coords.ariaRowIndex, numCols, numRows],
  );

  const gridClickHandler: PointerEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      let cursor = event.target as HTMLElement;
      while (cursor !== event.currentTarget && !cursor.hasAttribute("aria-colindex")) {
        cursor = cursor.parentElement!;
      }

      if (!cursor.hasAttribute("aria-colindex")) {
        // This is a legit outcome if the click was registered at a level above
        // grid cells or column headers.
        return;
      }

      const row = cursor.parentElement!;

      setCoords({
        ariaColIndex: Number(cursor.getAttribute("aria-colIndex")),
        ariaRowIndex: Number(row.getAttribute("aria-rowIndex")),
      });
    },
    [],
  );

  const gridKeydownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      switch (event.code) {
        case "ArrowDown": {
          if (effectiveCoords.ariaRowIndex !== numRows) {
            setCoords({
              ariaColIndex: effectiveCoords.ariaColIndex,
              ariaRowIndex: effectiveCoords.ariaRowIndex + 1,
            });
          }
          break;
        }
        case "ArrowUp": {
          if (effectiveCoords.ariaRowIndex !== 1) {
            setCoords({
              ariaColIndex: effectiveCoords.ariaColIndex,
              ariaRowIndex: effectiveCoords.ariaRowIndex - 1,
            });
          }
          break;
        }
        case "ArrowLeft": {
          if (effectiveCoords.ariaColIndex !== 1) {
            setCoords({
              ariaColIndex: effectiveCoords.ariaColIndex - 1,
              ariaRowIndex: effectiveCoords.ariaRowIndex,
            });
          }
          break;
        }
        case "ArrowRight": {
          if (effectiveCoords.ariaColIndex !== numCols) {
            setCoords({
              ariaColIndex: effectiveCoords.ariaColIndex + 1,
              ariaRowIndex: effectiveCoords.ariaRowIndex,
            });
          }
          break;
        }
        case "Home": {
          if (event.ctrlKey || event.metaKey) {
            setCoords({
              ariaColIndex: 1,
              ariaRowIndex: 1,
            });
            break;
          }

          setCoords({
            ariaColIndex: 1,
            ariaRowIndex: effectiveCoords.ariaRowIndex,
          });
          break;
        }
        case "End": {
          if (event.ctrlKey || event.metaKey) {
            setCoords({
              ariaColIndex: numCols,
              ariaRowIndex: numRows,
            });
            break;
          }

          setCoords({
            ariaColIndex: numCols,
            ariaRowIndex: effectiveCoords.ariaRowIndex,
          });
          break;
        }
        default: {
          return;
        }
      }

      event.preventDefault();

      // Optionally set the element focus here. Not sure how much differences it
      // makes in terms of performance vs relying on the useEffect hook.
    },
    [
      effectiveCoords.ariaColIndex,
      effectiveCoords.ariaRowIndex,
      numCols,
      numRows,
    ],
  );

  useEffect(() => {
    if (!gridRef.current) {
      // Not completely sure when this code can be reached, but it seems like a
      // decent solution to just return. At the worst the user may need to click
      // or do a keypress again during a corner case.
      return;
    }

    if (!gridRef.current.contains(document.activeElement)) {
      return;
    }

    const elToFocus = gridRef.current.querySelector(
      `:scope > div > div[aria-rowindex="${effectiveCoords.ariaRowIndex}"] > div[aria-colindex="${effectiveCoords.ariaColIndex}"]`,
    );

    if (elToFocus !== document.activeElement) {
      (elToFocus as HTMLElement).focus({ preventScroll: true });
    }
  }, [effectiveCoords.ariaColIndex, effectiveCoords.ariaRowIndex, gridRef]);

  return {
    effectiveCoords,
    gridClickHandler,
    gridKeydownHandler
  }
};

export default useGridFocus;
