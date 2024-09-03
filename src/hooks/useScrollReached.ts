import { useEffect, useRef, useState } from "react";

type ScrollReached = {
  ref: React.RefObject<HTMLElement>;
  direction: "horizontal" | "vertical";
  threshold?: number;
};

type State = {
  isOverflowed: boolean;
  isReached: boolean;
};

export const useScrollReached = ({
  ref,
  direction,
  threshold = 10,
}: ScrollReached): State => {
  const frame = useRef(0);

  const [state, setState] = useState<State>({
    isOverflowed: false,
    isReached: false,
  });

  useEffect(() => {
    if (!ref.current) return;

    let scrollSize =
      direction === "horizontal"
        ? ref.current.scrollWidth
        : ref.current.scrollHeight;
    let offsetSize =
      direction === "horizontal"
        ? ref.current.offsetWidth
        : ref.current.offsetHeight;

    const newOverflowedState = offsetSize < scrollSize;

    setState(prev => ({ ...prev, isOverflowed: newOverflowedState }));

    if (!newOverflowedState) return;

    const hanldeScroll = () => {
      if (!ref.current) return;

      const scrollAmount =
        direction === "horizontal"
          ? offsetSize + ref.current?.scrollLeft
          : offsetSize + ref.current?.scrollTop;

      frame.current = requestAnimationFrame(() => {
        scrollAmount >= scrollSize - threshold
          ? setState(prev => ({ ...prev, isReached: true }))
          : setState(prev => ({ ...prev, isReached: false }));
      });
    };

    const eventHandler = ref.current;

    eventHandler.addEventListener("scroll", hanldeScroll);

    return () => {
      eventHandler.removeEventListener("scroll", hanldeScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [direction, ref, threshold]);
  
  return state;
};
