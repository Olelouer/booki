import { cn } from "cn";

type ProgressBarProps = {
  min?: number;
  max?: number;
  value: number;
  variant?: "default" | "secondary";
};

export function ProgressBar({
  min,
  max,
  value,
  variant = "default",
}: ProgressBarProps) {
  const variants = {
    default: {
      container: "bg-white",
      bar: "bg-red-900",
    },
    secondary: {
      container: "bg-stone-100",
      bar: "bg-stone-400",
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={cn("h-1 w-full overflow-hidden rounded-lg", styles.container)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <div
        className={cn("h-full transition-all duration-300", styles.bar)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
