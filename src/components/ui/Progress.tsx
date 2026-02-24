interface ProgressProps {
  value: number;
  color?: string;
  size?: "sm" | "md";
}

const sizeStyles: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-1.5",
  md: "h-2.5",
};

export default function Progress({ value, color = "#3b82f6", size = "md" }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={[
        "w-full rounded-full bg-bg3 overflow-hidden",
        sizeStyles[size],
      ].join(" ")}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
