import type { ComponentProps } from "react";
import { cn } from "cn";

type SearchInputProps = ComponentProps<"input">;

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <input
      className={cn(
        "h-13 rounded-xl border px-4.5 text-lg duration-100 focus:border-accent focus:bg-white focus:outline-none",
        className,
      )}
      type="search"
      {...props}
    />
  );
}
