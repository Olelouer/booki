import { cn } from "cn";

type TabletProps = {
  text: string;
  className?: string;
};

export function Tablet({ text, className, ...props }: TabletProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex rounded-sm bg-stone-200 px-2.5 py-1 text-xs",
        className,
      )}
    >
      <span>{text}</span>
    </div>
  );
}
