import React from "react";

import { PlaylistSimple } from "@/types";

import { cn } from "@/lib/utils";

import Button from "../buttons/Button";
import Image from "../Image";
import { DotMenu } from "../icons";

interface PlaylistCardProps {
  data: PlaylistSimple;
  size?: "sm" | "md";
  onClick?: (playlistId: string) => void;
  [key: string]: any;
}

const PlaylistCard = ({
  data,
  size = "md",
  onClick,
  ...rest
}: PlaylistCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex justify-start items-center w-full",
        size == "sm" && "h-[60px]",
        size == "md" && "h-[80px]",
      )}
      {...rest}
    >
      <Button
        variant="plain"
        onClick={() => onClick(data.id)}
        useRipple
        className="h-full flex w-full flex-row justify-start items-center space-x-3 p-0"
      >
        {/* COL-1 */}
        <div
          className={cn(
            "relative aspect-square rounded-md bg-neutral-200 dark:bg-neutral-600 overflow-hidden",
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
        <div
          className={cn(
            "flex",
            size === "sm" && "flex-row space-x-3",
            size === "md" && "flex-col space-y-1 items-start",
          )}
        >
          <span className="font-semibold truncate">
            {data.playListName}
          </span>
          <span className="font-medium text-primary-foreground truncate">
            {data.count}곡
          </span>
        </div>
      </Button>

      {/* COL-3 */}
      <Button
        variant="plain"
        size="icon"
        useRipple
        className="absolute right-0"
      >
        <DotMenu className="w-[14px] h-[14px]" />
      </Button>
    </div>
  );
};

export default PlaylistCard;
