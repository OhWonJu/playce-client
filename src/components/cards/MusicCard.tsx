import { cn } from "@/lib/utils";

import Image from "../Image";
import { Play } from "../icons";

interface MusicCardProps {
  title: string;
  subTitle?: string;
  imageUrl?: string | string[];
  size?: "sm" | "md" | "lg";
  clickBlocking?: boolean;
  playable?: boolean;
  playAction?: () => void;
  onClick?: () => void;
  [key: string]: any;
}

const IMAGE_SIZE = {
  sm: 120,
  md: 160,
  lg: 200,
};

const MusicCard = ({
  title,
  imageUrl,
  size = "sm",
  clickBlocking,
  onClick,
  playable,
  playAction,
  subTitle,
  ...rest
}: MusicCardProps) => {
  const handleClick = () => {
    if (clickBlocking) return;

    onClick?.();
  };

  const handlePlayClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    if (clickBlocking) return;

    event.stopPropagation();
    playAction?.();
  };

  return (
    <div
      className={cn(
        "flex flex-col snap-center hover:cursor-pointer",
        size === "sm" && "w-[120px] min-h-[120px]",
        size === "md" && "w-[160px] min-h-[140px]",
        size === "lg" && "w-full min-h-[160px]",
        size === "lg" && "flex-row space-x-4 ",
      )}
      onClick={handleClick}
      {...rest}
    >
      <div
        className={cn(
          "relative aspect-square rounded-md mb-1 bg-neutral-200 dark:bg-neutral-600 overflow-hidden shadow-md",
          size === "sm" && "w-[120px] min-w-[120px]",
          size === "md" && "w-[160px] min-w-[160px]",
          size === "lg" && "w-[200px] min-w-[200px]",
        )}
      >
        {typeof imageUrl === "string" && imageUrl && (
          <Image
            alt="albumArt"
            imageUrl={imageUrl}
            width={IMAGE_SIZE[size]}
            lazy
          />
        )}

        {Array.isArray(imageUrl) && (
          <div className="grid grid-cols-2 grid-rows-2">
            {imageUrl.map(url => (
              <Image
                key={url}
                alt="albumArt"
                imageUrl={url}
                width={IMAGE_SIZE[size] / 2}
                lazy
              />
            ))}
          </div>
        )}
        {playable && (
          <span
            role="button"
            onClick={event => handlePlayClick(event)}
            className="absolute flex items-center justify-center bottom-2 right-2 p-1 bg-neutral-100/80 hover:bg-neutral-100 shadow-md rounded-full"
          >
            <Play className="pl-[3px]" />
          </span>
        )}
      </div>

      <div
        className={cn(
          "max-w-full overflow-hidden flex flex-col",
          size === "lg" && "min-h-full justify-center",
        )}
      >
        <span
          className={cn(
            "font-bold",
            size !== "lg" && "truncate",
            size === "lg" && "text-2xl",
          )}
        >
          {title}
        </span>
        {subTitle && (
          <span
            className={cn(
              "font-medium text-sm",
              size !== "lg" && "text-primary-foreground truncate",
              size === "lg" && "text-lg",
            )}
          >
            {subTitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
