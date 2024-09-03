interface MusicCardProps {
  title: string;
  subTitle?: string;
  imageSrc?: string;
  clickBlocking?: boolean;
  playable?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export const MusicCard = ({
  title,
  imageSrc,
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
      <div className="w-[120px] aspect-square rounded-md mb-1 bg-neutral-400"></div>
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
