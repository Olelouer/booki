import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";

type SelectInputProps<T extends string> = ComponentProps<"select"> & {
  data: readonly T[];
};

export function SelectInput<T extends string>({
  data,
  className,
  ...props
}: SelectInputProps<T>) {
  return (
    <div className="relative">
      <select
        className="cursor-pointer appearance-none rounded-lg border border-border bg-white py-2 pr-8 pl-3.5 text-sm duration-100 hover:border-stone-400 focus:border-accent"
        {...props}
      >
        <option key="all" value="">
          Tous
        </option>
        {data.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
    </div>
  );
}
