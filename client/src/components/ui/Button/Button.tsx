import styles from "./Button.module.scss";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonVisualProps = {
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVisualProps;
export type ButtonLinkProps = Omit<LinkProps, "className"> & ButtonVisualProps;

function getButtonClasses({
  className,
  fullWidth = false,
  size = "md",
  variant = "primary",
}: Omit<ButtonVisualProps, "children">) {
  return [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  className,
  fullWidth = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = getButtonClasses({ className, fullWidth, size, variant });

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  fullWidth = false,
  size = "md",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const classes = getButtonClasses({ className, fullWidth, size, variant });

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
