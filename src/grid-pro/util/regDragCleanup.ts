import { DragCleanupParams } from "./types";

interface ListenerRef {
  up: (event: PointerEvent) => void;
  cancel: (event: PointerEvent) => void;
  keydown: (event: KeyboardEvent) => void;
  contextmenu: (event: PointerEvent) => void;
}

const regDragCleanup: (params: DragCleanupParams) => void = ({
  element,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onContextMenu,
}) => {
  const listenerRef: ListenerRef = {
    up: () => {},
    cancel: () => {},
    keydown: () => {},
    contextmenu: () => {},
  };

  const cleanup: () => void = () => {
    element.removeEventListener("pointermove", onPointerMove);
    element.removeEventListener("pointerup", listenerRef.up);
    element.removeEventListener("pointercancel", listenerRef.cancel);
    element.removeEventListener("keydown", listenerRef.keydown);
    element.removeEventListener("contextmenu", listenerRef.contextmenu);
  };

  const augOnPointerUp = onPointerUp(cleanup);
  const augOnPointerCancel = onPointerCancel(cleanup);
  const augOnKeyDown = onKeyDown(cleanup);

  element.addEventListener("pointermove", onPointerMove);
  element.addEventListener("pointerup", augOnPointerUp);
  element.addEventListener("pointercancel", augOnPointerCancel);
  element.addEventListener("keydown", augOnKeyDown);
  element.addEventListener("contextmenu", onContextMenu);

  listenerRef.up = augOnPointerUp;
  listenerRef.cancel = augOnPointerCancel;
  listenerRef.keydown = augOnKeyDown;
  listenerRef.contextmenu = onContextMenu;
};

export default regDragCleanup;
