export interface DragCleanupParams {
  element: HTMLElement;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: PointerCleanupFnParam;
  onPointerCancel: PointerCleanupFnParam;
  onKeyDown: KeyboardCleanupFnParam;
  onContextMenu: (event: PointerEvent) => void;
}

export type PointerCleanupFnParam = (
  removeListeners: () => void,
) => (event: PointerEvent) => void;

export type KeyboardCleanupFnParam = (
  removeListeners: () => void,
) => (event: KeyboardEvent) => void;
