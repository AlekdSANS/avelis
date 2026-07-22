import styles from "./NewsletterForm.module.scss";

type NewsletterFormProps = {
  className?: string;
};

export function NewsletterForm({ className }: NewsletterFormProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      NewsletterForm
    </div>
  );
}
