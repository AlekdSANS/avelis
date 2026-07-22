import styles from "./Modal.module.scss";

type ModalProps = {
  className?: string;
};

export function Modal({ className }: ModalProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Modal
    </div>
  );
}
