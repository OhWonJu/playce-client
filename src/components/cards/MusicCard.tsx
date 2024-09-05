import { cn } from "@/lib/utils";

import Image from "../Image";
import { Play } from "../icons";

interface MusicCardProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
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
        size === "lg" && "w-[200px] min-h-[160px]",
      )}
      onClick={handleClick}
      {...rest}
    >
      <div
        className={cn(
          "relative aspect-square rounded-md mb-1 bg-neutral-200 dark:bg-neutral-600 overflow-hidden",
          size === "sm" && "w-[120px]",
          size === "md" && "w-[160px]",
          size === "lg" && "w-[200px]",
        )}
      >
        {imageUrl && (
          <Image alt="albumArt" width={IMAGE_SIZE[size]} imageUrl={imageUrl} />
        )}
        {playable && (
          <span
            onClick={event => handlePlayClick(event)}
            className="absolute flex items-center justify-center bottom-2 right-2 p-1 bg-primary-foreground/95 hover:bg-primary-foreground shadow-md rounded-full "
          >
            <Play className="pl-[3px]" />
          </span>
        )}
      </div>

      <span className="font-semibold truncate">{title}</span>
      {subTitle && (
        <span className="font-semibold text-sm text-primary-foreground truncate">
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default MusicCard;
