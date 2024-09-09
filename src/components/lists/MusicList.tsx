import { cn } from "@/lib/utils";
import React, { useRef } from "react";
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
}: MusicListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isGrabbing = useHorizontalScroll(listRef);

  const RenderedItems = renderer?.();

  const handleItemClick = () => {
    if (isGrabbing) {
      return;
    }
  };

  // TODO Intersection opserver image lazy loading
  // useEffect(() => {
  //   if (listRef.current) {
  //     const imgElements = listRef.current.querySelectorAll("img");
  //   }
  // }, []);

  return (
    <section className={cn("flex flex-col w-full", className)}>
      <div className="flex flex-row w-full justify-between items-center mb-4">
        <strong className="text-2xl sm:text-4xl font-bold">{title}</strong>
        {hasMore && (
          <span
            role="button"
            onClick={hasMoreAction}
            className="text-primary-foreground font-semibold text-sm p-1"
          >
            더보기
          </span>
        )}
      </div>
      <div
        ref={listRef}
        onClick={handleItemClick}
        className={cn(
          "flex content-start w-full max-h-[400px] overflow-x-scroll scrollbar-hide gap-x-3 gap-y-4",
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
        {RenderedItems?.map(item =>
          React.cloneElement(item, {
            clickBlocking: isGrabbing,
          }),
        )}
      </div>
    </section>
  );
};
