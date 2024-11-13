import React, { useEffect, useRef, useState } from "react";

export const useHorizontalScroll = (
  ref: React.RefObject<HTMLElement>,
  sensitive: number = 10,
) => {
  const frame = useRef(0);
  const pos = useRef({ left: 0, x: 0 });

  const [isGrabbing, setIsGrabbing] = useState(false);
  const currentGrabbingState = useRef(isGrabbing);

  useEffect(() => {
    const mouseDownHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;
      // non-Scrollable
      if (ref.current.scrollWidth === ref.current.clientWidth) return;

      ref.current.style.cursor = "grabbing";
      ref.current.style.userSelect = "none";

      pos.current = { left: ref.current.scrollLeft, x: event.clientX };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;

      const dx = event.clientX - pos.current.x;

      if (Math.abs(dx) > sensitive && !currentGrabbingState.current) {
        currentGrabbingState.current = true;
        setIsGrabbing(true);
      }

      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return;

        ref.current.scrollLeft = pos.current.left - dx;
      });
    };

    const mouseUpHandler = (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref.current) return;

      if (currentGrabbingState.current) {
        setTimeout(() => {
          currentGrabbingState.current = false;
          setIsGrabbing(false);
        }, 1);
      }

      ref.current.style.cursor = "auto";
      ref.current.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      cancelAnimationFrame(frame.current);
    };

    const eventHandler = ref.current;

    eventHandler?.addEventListener("mousedown", mouseDownHandler);

    return () => {
      eventHandler?.removeEventListener("mousedown", mouseDownHandler);
      // cancelAnimationFrame(frame.current);
    };
  }, [isGrabbing, ref, sensitive]);

  return isGrabbing;
};
