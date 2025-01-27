interface ImageProps {
  imageUrl: string;
  alt: string;
  width?: string | number;
  priority?: boolean;
  lazy?: boolean;
  className?: string;
  [key: string]: any;
}

const IMAGE_SET_WIDTH = [200, 400, 800];

const Image = ({
  imageUrl,
  alt,
  width,
  priority = false,
  lazy = false,
  className,
  ...rest
}: ImageProps) => {
  let options: any = {
    srcSet: `${imageUrl}_200w.webp 200w,
             ${imageUrl}_400w.webp 400w,
             ${imageUrl}_800w.webp 800w`,
    src: `${imageUrl}_800w.webp`,
  };

  if (typeof width === "number") {
    const closestWidth = IMAGE_SET_WIDTH.reduce((prev, curr) => {
      return Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev;
    });

    const selectedImageUrl = `${imageUrl}_${closestWidth}w.webp`;

    options = { src: selectedImageUrl };
  }

  return (
    <img
      alt={alt}
      width={width}
      className={className}
      fetchPriority={priority ? "high" : "auto"}
      loading={lazy ? "lazy" : undefined}
      draggable={false}
      {...options}
      {...rest}
    />
  );
};

export default Image;
