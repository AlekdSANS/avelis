import styles from "./Select.module.scss";
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, ...props }, ref) => (
    <select
      className={[styles.select, className ?? ""].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = "Select";
