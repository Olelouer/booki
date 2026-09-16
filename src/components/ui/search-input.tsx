import type { ComponentProps } from "react"
import { cn } from "cn"

type SearchInputProps = ComponentProps<"input">;

export function SearchInput({className, ...props}: SearchInputProps) {
    return (
        <input 
            className={cn("h-13 text-lg px-4.5 rounded-xl border-1 focus:bg-white focus:border-accent focus:outline-none duration-100", className)}
            type="search"
            {...props}
        />
    )
}