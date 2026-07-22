import styles from "./Modal.module.scss";

type ModalProps = {
  className?: string;
};

export function Modal({ className }: ModalProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Modal
    </div>
  );
}
