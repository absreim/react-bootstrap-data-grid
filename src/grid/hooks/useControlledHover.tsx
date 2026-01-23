import { MouseEventHandler, useState } from "react";

export interface UseControlledHoverHook<T> {
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
  handleMouseOver: MouseEventHandler<T>;
  handleMouseOut: MouseEventHandler<T>;
}

const useControlledHover: <T>() => UseControlledHoverHook<T> = <T,>() => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver: MouseEventHandler<T> = () => setIsHovering(true);
  const handleMouseOut: MouseEventHandler<T> = () => setIsHovering(false);

  return {
    isHovering,
    setIsHovering,
    handleMouseOver,
    handleMouseOut,
  };
};

export default useControlledHover;
