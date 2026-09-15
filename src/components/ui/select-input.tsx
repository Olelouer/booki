import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";

type SelectInputProps<T extends string> = ComponentProps<"select"> & {
    data: readonly T[];
};

export function SelectInput<T extends string>({data, className, ...props}: SelectInputProps<T>) {
    return (
        <div className="relative">
            <select
                className="border-border border-1 pl-3.5 pr-8 py-2 bg-white rounded-lg text-sm duration-100 cursor-pointer appearance-none hover:border-stone-400 focus:border-red-900"
                {...props}
            >
                <option key="all" value="">Tous</option>
                {data.map(item => {
                    return <option key={item} value={item}>{item}</option>
                })}
            </select>
            <ChevronDown className="absolute size-4 pointer-events-none top-1/2 right-2 -translate-y-1/2" />
        </div>
    )
}