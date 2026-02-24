import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-blue text-white hover:brightness-110 active:brightness-95 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
  secondary:
    "bg-bg3 border border-bdr text-t2 hover:border-bdr2 hover:text-t1",
  ghost:
    "bg-transparent text-t2 hover:bg-bg3 hover:text-t1",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-all duration-200 cursor-pointer",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
