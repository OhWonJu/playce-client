import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HomeLoading = () => {
  return (
    <>
      {new Array(4).fill(null).map((_, index) => {
        return (
          <section key={`section-${index}`} className="flex flex-col w-full">
            <div className="__TITLE__ mb-4">
              <Skeleton className="h-[2.75rem] w-[150px]" />
            </div>
            <div className="__ITEM_WRAPPER__ flex w-full max-h-[400px] overflow-hidden gap-x-3 mb-[1rem]">
              {new Array(20).fill(null).map((_, index1) => {
                return (
                  <div
                    key={`${index}-${index1}-item1`}
                    className="flex flex-col"
                  >
                    <Skeleton className="h-[160px] w-[160px] mb-1" />
                    <div className="flex flex-col space-y-1">
                      <Skeleton className="h-[1.5rem] w-[50px]" />
                      <Skeleton className="h-[1.25rem] w-[90px]" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="__ITEM_WRAPPER__ flex w-full max-h-[400px] overflow-hidden gap-x-3 gap-y-4">
              {new Array(20).fill(null).map((_, index2) => {
                return (
                  <div
                    key={`${index}-${index2}-item2`}
                    className="flex flex-col"
                  >
                    <Skeleton className="h-[160px] w-[160px] mb-1" />
                    <div className="flex flex-col space-y-1">
                      <Skeleton className="h-[1.5rem] w-[50px]" />
                      <Skeleton className="h-[1.25rem] w-[90px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default HomeLoading;
