import { cn } from "cn";

type ImageAspectProps = {
    src?: string;
    alt?: string;
    aspect?: string;
    fallback?: string; 
    className?: string;
}

export function ImageAspect({ src, alt, aspect = "aspect-2/3", className, fallback}: ImageAspectProps) {
    return (
        <div className={cn("relative flex items-center justify-center rounded overflow-hidden bg-stone-100 shrink-0 transition-all duration-300 ease-out shadow-sm", aspect, className)}>
            {src ?
                <img 
                    className="absolute inset-0 w-full h-full object-cover"    
                    src={src} 
                    alt={alt}
                    loading="lazy"
                />
                : <span className="text-2xl font-serif text-stone-500">{fallback}</span>
            }
        </div>
    )
}