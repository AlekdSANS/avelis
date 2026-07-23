import styles from "./Input.module.scss";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      className={[styles.input, className ?? ""].filter(Boolean).join(" ")}
      ref={ref}
      type={type}
      {...props}
    />
  ),
);

Input.displayName = "Input";
