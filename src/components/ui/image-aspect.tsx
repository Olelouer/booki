import { cn } from "cn";

type ImageAspectProps = {
  src?: string;
  alt?: string;
  aspect?: string;
  fallback?: string;
  className?: string;
};

export function ImageAspect({
  src,
  alt,
  aspect = "aspect-2/3",
  className,
  fallback,
}: ImageAspectProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded bg-stone-100 shadow-sm transition-all duration-300 ease-out",
        aspect,
        className,
      )}
    >
      {src ? (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          alt={alt}
          loading="lazy"
        />
      ) : (
        <span className="font-serif text-2xl text-stone-500">{fallback}</span>
      )}
    </div>
  );
}
