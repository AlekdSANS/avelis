import styles from "./IconButton.module.scss";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "plain" | "soft" | "outline";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  "aria-label": string;
  className?: string;
  children: ReactNode;
  variant?: IconButtonVariant;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      type = "button",
      variant = "plain",
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button className={classes} ref={ref} type={type} {...props}>
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
