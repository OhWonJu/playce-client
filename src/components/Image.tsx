interface ImageProps {
  imageUrl: string;
  alt: string;
  width?: string | number;
  lazy?: boolean;
  className?: string;
}

const Image = ({
  imageUrl,
  alt,
  width,
  lazy = false,
  className,
}: ImageProps) => {
  return (
    <img
      alt={alt}
      srcSet={`${imageUrl}_200w.webp 800w,
          ${imageUrl}_400w.webp 1200w,
          ${imageUrl}_800w.webp 2400w`}
      src={`${imageUrl}_800w.webp`}
      width={width}
      className={className}
      loading={lazy ? "lazy" : undefined}
    />
  );
};

export default Image;
