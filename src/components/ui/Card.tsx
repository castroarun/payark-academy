interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = "", hoverable = false }: CardProps) {
  return (
    <div
      className={[
        "bg-bg2 border border-bdr rounded-xl p-5",
        hoverable
          ? "transition-all duration-200 hover:border-bdr2 hover:translate-y-[-1px]"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
