import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../auth/hooks/useAuth";
import { trackGrowth } from "../../services/analytics";
import { growthService } from "../../services/growthService";
import styles from "./ProductReviews.module.scss";

export function ProductReviews({ slug }: { slug: string }) {
  const client = useQueryClient();
  const user = useCurrentUser();
  const query = useQuery({ queryKey: ["reviews", slug], queryFn: () => growthService.getProductReviews(slug) });
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sent, setSent] = useState(false);
  const mutation = useMutation({
    mutationFn: () => growthService.submitReview(slug, { rating, title: title || null, content: content || null }),
    onSuccess: async () => {
      setSent(true);
      trackGrowth({ event: "review_submit", content_id: slug, content_type: "product" });
      await client.invalidateQueries({ queryKey: ["reviews", slug] });
    },
  });
  const submit = (event: FormEvent) => { event.preventDefault(); mutation.mutate(); };
  return (
    <section className={styles.section} aria-labelledby="reviews-title">
      <header><p>Community notes</p><h2 id="reviews-title">Worn and remembered.</h2><span>{query.data?.length ?? 0} approved reviews</span></header>
      <div className={styles.layout}>
        <div className={styles.list}>
          {query.data?.length ? query.data.map((review) => (
            <article key={review.id}>
              <div><span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span><time>{new Date(review.createdAt).toLocaleDateString()}</time></div>
              <h3>{review.title || "A fragrance impression"}</h3>
              <p>{review.content || "The reviewer left a rating without a written note."}</p>
              <small>{review.reviewerName}{review.verifiedPurchase ? <><ShieldCheck aria-hidden="true" />Verified purchase</> : null}</small>
            </article>
          )) : <p>No published reviews yet. Be the first to share an impression.</p>}
        </div>
        <aside>
          {user.data ? sent ? (
            <div className={styles.success}><h3>Thank you.</h3><p>Your review is awaiting moderation and will not affect the rating until approved.</p></div>
          ) : (
            <form onSubmit={submit}>
              <h3>Write a review</h3>
              <fieldset><legend>Your rating</legend>{[1, 2, 3, 4, 5].map((value) => <label key={value}><input checked={rating === value} name="rating" onChange={() => setRating(value)} type="radio" value={value} /><Star aria-hidden="true" fill={value <= rating ? "currentColor" : "none"} /><span>{value} stars</span></label>)}</fieldset>
              <label>Title<input maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} /></label>
              <label>Your impression<textarea maxLength={2000} rows={5} value={content} onChange={(event) => setContent(event.target.value)} /></label>
              <button disabled={mutation.isPending} type="submit">{mutation.isPending ? "Submitting…" : "Submit for review"}</button>
              {mutation.isError ? <p role="alert">{mutation.error.message}</p> : null}
            </form>
          ) : <div className={styles.success}><h3>Share your impression.</h3><p>Sign in to submit one review for this fragrance.</p><Link to="/login">Sign in to review</Link></div>}
        </aside>
      </div>
    </section>
  );
}
