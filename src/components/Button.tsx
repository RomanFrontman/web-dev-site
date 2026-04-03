// src/components/Button.tsx
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  /** Tailwind gradient classes, e.g. "from-purple-500 to-blue-500". Primary only. */
  gradient?: string;
  className?: string;
  children: ReactNode;
  // anchor props
  href?: string;
  target?: string;
  rel?: string;
  // button props
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const SIZES = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4",
} as const;

export default function Button({
  variant = "primary",
  size = "md",
  gradient = "from-purple-500 to-pink-500",
  className = "",
  children,
  href,
  target,
  rel,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300";

  const variantClass =
    variant === "primary"
      ? `bg-gradient-to-r ${gradient} text-white hover:scale-105 shadow-lg hover:shadow-purple-500/25 hover:opacity-90`
      : "border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white";

  const disabledClass = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  const classes = [base, SIZES[size], variantClass, disabledClass, className]
    .filter(Boolean)
    .join(" ");

  if (href !== undefined) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
