import type { CSSProperties } from "react";

interface ResponsiveImageProps {
  image: ResponsiveImageData;
  sizes: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  style?: CSSProperties;
}

// Renders a plain <img> from a `?preset=...` import. `sizes` must describe the CSS width the image is shown at.
const ResponsiveImage = ({ image, sizes, alt, className, loading = "lazy", style }: ResponsiveImageProps) => {
  const srcSet = Object.values(image.sources)[0];
  return (
    <img
      src={image.img.src}
      srcSet={srcSet}
      sizes={sizes}
      width={image.img.w}
      height={image.img.h}
      alt={alt}
      className={className}
      loading={loading}
      style={style}
    />
  );
};

export default ResponsiveImage;
