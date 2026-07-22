import styles from "./Drawer.module.scss";

type DrawerProps = {
  className?: string;
};

export function Drawer({ className }: DrawerProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Drawer
    </div>
  );
}
