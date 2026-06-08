import type { ButtonHTMLAttributes } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const baseButtonClassName =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

function AppButton({
  children,
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${baseButtonClassName} ${className}`}
    >
      {children}
    </button>
  );
}

export default AppButton;