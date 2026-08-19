import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { findScents, type ScentProfile } from "../../features/scentFinder/scentFinder";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import { trackGrowth } from "../../services/analytics";
import { productService } from "../../services/productService";
import styles from "./ScentFinderPage.module.scss";

const questions = [
  { key: "family", title: "Which atmosphere draws you in?", options: [["floral", "Petals after rain"], ["woody", "Quiet woods"], ["amber", "Warm resin"], ["fresh", "Clear air"]] },
  { key: "note", title: "Choose one material instinctively.", options: [["bergamot", "Bergamot peel"], ["rose", "Rose silk"], ["cedar", "Cedar grain"], ["musk", "Soft musk"]] },
  { key: "season", title: "When should it feel most at home?", options: [["spring", "Spring"], ["summer", "Summer"], ["autumn", "Autumn"], ["winter", "Winter"]] },
  { key: "occasion", title: "Where will you wear it?", options: [["daily", "Every day"], ["work", "Quiet focus"], ["evening", "After dark"], ["special", "A marked occasion"]] },
  { key: "intensity", title: "How should it enter the room?", options: [["intimate", "Close to skin"], ["balanced", "Present, composed"], ["expressive", "Leave a trace"]] },
] as const;

export function ScentFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<ScentProfile>>({});
  const productsQuery = useQuery({ queryKey: ["scent-finder-products"], queryFn: () => productService.getProducts({ page: 1, limit: 48 }) });
  const { wishlist, toggleWishlist } = useLocalWishlist();
  const complete = step >= questions.length;
  const results = useMemo(() => complete && Object.keys(answers).length === 5 ? findScents(productsQuery.data?.data ?? [], answers as ScentProfile) : [], [answers, complete, productsQuery.data]);
  useDocumentMetadata({ title: "Scent Finder | AVELIS", description: "Answer five questions and receive fragrance matches scored from the live AVELIS catalogue.", canonicalPath: "/scent-finder" });
  useEffect(() => { trackGrowth({ event: "scent_finder_start", content_id: "finder-v1" }); }, []);
  useEffect(() => { if (complete && results.length) trackGrowth({ event: "scent_finder_complete", content_id: "finder-v1", result_ids: results.map((result) => result.product.id).join(",") }); }, [complete, results]);
  const question = questions[step];
  const choose = (value: string) => { if (!question) return; setAnswers((current) => ({ ...current, [question.key]: value })); setStep((current) => current + 1); };
  return <main className={styles.page}>
    <header className={styles.hero}><p>AVELIS scent finder</p><h1>Follow the feeling, not the category.</h1><span>Five considered choices, matched against notes, family, season, occasion and concentration in the live catalogue.</span></header>
    {!complete && question ? <section className={styles.quiz} aria-labelledby="finder-question"><div className={styles.progress}><span>Question {step + 1} of {questions.length}</span><i style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><h2 id="finder-question">{question.title}</h2><div className={styles.options}>{question.options.map(([value, label]) => <button key={value} onClick={() => choose(value)} type="button"><span>{label}</span><ArrowRight aria-hidden="true" /></button>)}</div>{step > 0 ? <button className={styles.back} onClick={() => setStep((value) => value - 1)} type="button"><ArrowLeft aria-hidden="true" />Back</button> : null}</section> : null}
    {complete ? <section className={styles.results} aria-labelledby="finder-results"><header><p>Your edit</p><h2 id="finder-results">Three compositions with the closest resonance.</h2><button onClick={() => { setAnswers({}); setStep(0); }} type="button"><RotateCcw aria-hidden="true" />Start again</button></header>{productsQuery.isLoading ? <p>Reading the catalogue…</p> : <><ProductGrid itemListId="scent_finder_results" itemListName="Scent finder results" items={results.map(({ product }) => ({ product }))} onWishlistToggle={toggleWishlist} wishlist={wishlist} />{results.map(({ product, reasons }) => <p className={styles.reason} key={product.id}><Link onClick={() => trackGrowth({ event: "scent_finder_select", content_id: product.id })} to={`/products/${product.slug}`}>{product.name}</Link> — {reasons.slice(0, 3).join(", ") || "closest overall catalogue match"}.</p>)}</>}</section> : null}
  </main>;
}
