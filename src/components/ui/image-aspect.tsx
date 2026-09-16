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
        <div className={cn("relative flex items-center justify-center rounded-lg overflow-hidden bg-stone-100 shrink-0", aspect, className)}>
            {src ?
                <img 
                    className="absolute inset-0 w-full h-full object-cover"    
                    src={src} 
                    alt={alt}
                />
                : <span className="text-2xl font-serif text-stone-500">{fallback}</span>
            }
        </div>
    )
}