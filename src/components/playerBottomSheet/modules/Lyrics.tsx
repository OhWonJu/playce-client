import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Lyrics = () => {
  return (
    <section className="flex flex-col w-full gap-y-1">
      <Skeleton className="w-[70%] h-[15px]" />
      <Skeleton className="w-[60%] h-[15px]" />
      <Skeleton className="w-[70%] h-[15px]" />
      <Skeleton className="w-[50%] h-[15px] mb-4" />

      <Skeleton className="w-[80%] h-[15px]" />
      <Skeleton className="w-[60%] h-[15px]" />
      <Skeleton className="w-[40%] h-[15px]" />
      <Skeleton className="w-[80%] h-[15px]" />
      <Skeleton className="w-[60%] h-[15px]" />
      <Skeleton className="w-[40%] h-[15px] mb-4" />

      <Skeleton className="w-[55%] h-[15px]" />
      <Skeleton className="w-[50%] h-[15px]" />
      <Skeleton className="w-[55%] h-[15px]" />
      <Skeleton className="w-[50%] h-[15px] mb-4" />
    </section>
  );
};

export default Lyrics;
