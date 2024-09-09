import { PlaylistSimple } from "@/types";
import React from "react";
import Button from "../Button/Button";
import { cn } from "@/lib/utils";
import Image from "../Image";

interface PlaylistCardProps {
  data: PlaylistSimple;
  size?: "sm" | "md";
  onClick?: () => void;
  [key: string]: any;
}

const PlaylistCard = ({
  data,
  size = "md",
  onClick,
  ...rest
}: PlaylistCardProps) => {
  return (
    <Button
      variant="plain"
      onClick={onClick}
      useRipple
      className={cn(
        "group relative flex justify-start w-full p-0 space-x-2",
        size == "sm" && "h-[60px]",
        size == "md" && "h-[80px]",
      )}
      {...rest}
    >
      {/* COL-1 */}
      <div
        className={cn(
          "relative aspect-square rounded-md mb-1 bg-neutral-200 dark:bg-neutral-600 overflow-hidden",
          size === "sm" && "w-[60px]",
          size === "md" && "w-[80px]",
        )}
      >
        {typeof data.thumbNail === "string" && data.thumbNail && (
          <Image
            alt="play list"
            imageUrl={data.thumbNail}
            width={size == "sm" ? 60 : 80}
            lazy
          />
        )}
        {Array.isArray(data.thumbNail) && (
          <div className="grid grid-cols-2 grid-rows-2">
            {data.thumbNail.map(url => (
              <Image
                key={url}
                alt="albumArt"
                imageUrl={url}
                width={size == "sm" ? 30 : 40}
                lazy
              />
            ))}
          </div>
        )}
      </div>

      {/* COL-2 */}
      <div className="flex flex-col">
        <span className="font-semibold truncate">{data.playListName}</span>
      </div>
    </Button>
  );
};

export default PlaylistCard;
