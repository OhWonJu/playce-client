import { useEffect } from "react";

export const useOutsideClick = (
  enabled: boolean,
  elementRef: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;

    if (!element) return;

    function callbackHandler(event: any) {
      if (!element?.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("click", callbackHandler);

    return () => {
      document.removeEventListener("click", callbackHandler);
    };
  }, [enabled, elementRef, callback]);
};
