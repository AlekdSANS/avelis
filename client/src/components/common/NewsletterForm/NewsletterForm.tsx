import styles from "./NewsletterForm.module.scss";
import { useId, useState, type FormEvent } from "react";

import { Button } from "../../ui/Button/Button";

type NewsletterFormProps = {
  className?: string;
  isLoading?: boolean;
  showLocalNote?: boolean;
};

export function NewsletterForm({
  className,
  isLoading = false,
  showLocalNote = true,
}: NewsletterFormProps) {
  const inputId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = [styles.form, className ?? ""].filter(Boolean).join(" ");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <label htmlFor={inputId}>Receive AVELIS notes</label>
      <div className={styles.control}>
        <input
          autoComplete="email"
          disabled={isLoading || isSubmitted}
          id={inputId}
          name="email"
          placeholder="Email address"
          required
          type="email"
        />
        <Button
          aria-busy={isLoading}
          disabled={isLoading || isSubmitted}
          size="sm"
          type="submit"
          variant="secondary"
        >
          {isLoading ? "Joining..." : isSubmitted ? "Joined" : "Join"}
        </Button>
      </div>
      <div aria-live="polite" className={styles.status}>
        {isSubmitted ? (
          <p>Thank you. This preview keeps your sign-up on this page only.</p>
        ) : showLocalNote ? (
          <p>Preview form. No email is sent yet.</p>
        ) : null}
      </div>
    </form>
  );
}
