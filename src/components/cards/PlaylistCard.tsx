import { PlaylistSimple, Track } from "@/types";
import React from "react";
import Button from "../Button/Button";
import { cn } from "@/lib/utils";
import Image from "../Image";

interface PlaylistCardProps {
  data: PlaylistSimple;
  size?: "sm" | "md";
  onClick?: (playlistId: string, tracks: Track[]) => void;
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
      onClick={() => onClick(data.id, data.tracks)}
      useRipple
      className={cn(
        "group relative flex justify-start w-full p-0 space-x-3",
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
        {data.thumbNail.length < 4 && data.thumbNail[0] && (
          <Image
            alt="play list"
            imageUrl={data.thumbNail[0]}
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
      <div className="flex flex-row">
        <span className="font-semibold truncate mr-3">{data.playListName}</span>
        <span className="font-semibold truncate">{data.count}곡</span>
      </div>
    </Button>
  );
};

export default PlaylistCard;
