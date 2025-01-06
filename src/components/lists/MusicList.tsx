import React, { useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface MusicListProps {
  title: string;
  hasMore?: boolean;
  hasMoreAction?: () => void;
  exceptionGuide?: string;
  exceptionAction?: () => void;
  singleLine?: boolean;
  renderer?: () => JSX.Element[] | undefined;
  className?: string;
  id?: string;
}

export const MusicList = ({
  title,
  hasMore = true,
  hasMoreAction,
  exceptionGuide,
  exceptionAction,
  singleLine = false,
  renderer,
  className,
  id,
}: MusicListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isGrabbing = useHorizontalScroll(listRef);

  const RenderedItems = useMemo(() => renderer?.(), [renderer]);

  // const handleItemClick = () => {
  //   if (isGrabbing) {
  //     return;
  //   }
  // };

  // TODO Intersection opserver image lazy loading
  // useEffect(() => {
  //   if (listRef.current) {
  //     const imgElements = listRef.current.querySelectorAll("img");
  //   }
  // }, []);

  return (
    <section id={id} className={cn("flex flex-col w-full", className)}>
      <div className="flex flex-row w-full justify-between items-center mb-4">
        <strong className="text-3xl sm:text-4xl font-bold">{title}</strong>
        {hasMore && (
          <span
            role="button"
            onClick={hasMoreAction}
            className="text-primary-foreground text-sm p-1"
          >
            더보기
          </span>
        )}
      </div>
      <div
        ref={listRef}
        // onClick={handleItemClick}
        className={cn(
          "relative flex content-start w-full max-h-[400px] overflow-x-scroll scrollbar-hide gap-x-3 gap-y-4",
          singleLine ? "flex-row" : "flex-col flex-wrap",
        )}
      >
        {(!RenderedItems || RenderedItems?.length < 1) && (
          <div className="h-[200px] w-full text-center content-center text-primary-foreground font-semibold">
            <span onClick={exceptionAction} className="cursor-pointer">
              {exceptionGuide}
            </span>
          </div>
        )}
        {/* isGrabbing 일 때 막을 씌우는 형태는? 아이템들의 props 가 변하지 않아도 됨.. */}
        {RenderedItems}
        {/* RenderedItem must have ClickBlocking props */}
        {/* {RenderedItems?.map(item => {
          return React.cloneElement(item, {
            clickBlocking: isGrabbing,
          });
        })} */}

        <div
          className={cn(
            "absolute top-0 left-0 h-full bg-transparent",
            !isGrabbing && "hidden",
          )}
          style={{ width: listRef.current?.scrollWidth }}
        />
      </div>
    </section>
  );
};
