import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import { growthService } from "../../services/growthService";
import styles from "./JournalPage.module.scss";
export function JournalPage() {
  const query = useQuery({ queryKey: ["journal"], queryFn: growthService.getArticles });
  useDocumentMetadata({ title: "Journal | AVELIS", description: "Notes on fragrance, materials and the rituals around scent.", canonicalPath: "/journal" });
  return <main className={styles.page}><header><p>AVELIS journal</p><h1>Notes from the atelier.</h1><span>Fragrance, materials and the quiet rituals that give them context.</span></header><section aria-label="Journal articles" className={styles.grid}>{query.isLoading ? <p>Opening the archive…</p> : query.data?.map((article, index) => <article className={index === 0 && article.isFeatured ? styles.featured : undefined} key={article.id}>{article.coverImageUrl ? <img alt="" src={article.coverImageUrl} /> : <div className={styles.placeholder} aria-hidden="true" />}<div><p>{article.eyebrow ?? article.tags[0] ?? "Journal"}</p><h2>{article.title}</h2><span>{article.excerpt}</span><small>{article.readingTimeMinutes} min read</small><Link to={`/journal/${article.slug}`}>Read story <ArrowRight aria-hidden="true" /></Link></div></article>)}</section></main>;
}
