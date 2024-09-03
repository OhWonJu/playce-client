import Image from "../Image";

interface MusicCardProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
  clickBlocking?: boolean;
  playable?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export const MusicCard = ({
  title,
  imageUrl,
  clickBlocking,
  onClick,
  subTitle,
  ...rest
}: MusicCardProps) => {
  const handleClick = () => {
    if (clickBlocking) return;
    onClick?.();
  };

  return (
    <div
      className="flex flex-col w-[120px] min-h-[120px] snap-center"
      onClick={handleClick}
      {...rest}
    >
      <div className="w-[120px] aspect-square rounded-md mb-1 bg-neutral-200 dark:bg-neutral-600 overflow-hidden">
        {imageUrl && <Image alt="albumArt" imageUrl={imageUrl} />}
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

// export default AlbumCard;
