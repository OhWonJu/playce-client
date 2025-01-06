import { useEffect, useRef } from "react";

export const useGobackBlocking = (callback?: Function) => {
  const isDev = import.meta.env.MODE === "development";
  const isInit = useRef(true);
  const isUsingCallback = useRef(false);

  useEffect(() => {
    if (isDev && isInit.current) {
      isInit.current = false;
      return;
    }

    const popstateHandler = () => {
      isUsingCallback.current = true;
      callback?.();
    };

    history.pushState({ state: "blocking" }, undefined);

    window.addEventListener("popstate", popstateHandler);
    return () => {
      !isUsingCallback.current && history.state.state && history.back();
      window.removeEventListener("popstate", popstateHandler);
    };
  }, []);
};
