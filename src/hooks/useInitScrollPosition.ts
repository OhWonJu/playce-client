import { MutableRefObject, useLayoutEffect } from "react";

const getPageScrollPosition = (pageName: string) => {
  return JSON.parse(sessionStorage.getItem(pageName) || "0");
};

const setPageScrollPosition = (pageName: string, position: number) => {
  sessionStorage.setItem(pageName, JSON.stringify(position));
};

const useInitScrollPosition = (
  pageName: string,
  pageRef: MutableRefObject<HTMLDivElement>,
) => {
  useLayoutEffect(() => {
    const view = pageRef.current;

    if (!view) return;

    const prevScrollPosition = getPageScrollPosition(pageName) || 0;

    // 이전 스크롤 위치로 이동
    view.scroll({ top: prevScrollPosition, behavior: "instant" });

    return () => {
      setPageScrollPosition(pageName, view.scrollTop);
    };
  }, [pageName, pageRef.current]);
};

export default useInitScrollPosition;
