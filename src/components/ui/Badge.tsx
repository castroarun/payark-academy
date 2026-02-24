interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "solid" | "outline";
}

export default function Badge({
  children,
  color = "#3b82f6",
  variant = "solid",
}: BadgeProps) {
  const solidStyle: React.CSSProperties = {
    backgroundColor: color,
    color: "#ffffff",
  };

  const outlineStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    borderColor: color,
    color: color,
  };

  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold",
        variant === "outline" ? "border" : "",
      ].join(" ")}
      style={variant === "solid" ? solidStyle : outlineStyle}
    >
      {children}
    </span>
  );
}
