import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import { trackGrowth } from "../../services/analytics";
import { growthService } from "../../services/growthService";
import styles from "./JournalArticlePage.module.scss";
export function JournalArticlePage() { const { slug = "" } = useParams(); const query = useQuery({ queryKey: ["journal", slug], queryFn: () => growthService.getArticle(slug), enabled: Boolean(slug) }); const article = query.data; useDocumentMetadata({ title: `${article?.seoTitle ?? article?.title ?? "Journal"} | AVELIS`, description: article?.seoDescription ?? article?.excerpt ?? "AVELIS journal", canonicalPath: `/journal/${slug}` }); useEffect(() => { if (article) trackGrowth({ event: "journal_view", content_id: article.id, content_type: "journal_article" }); }, [article]); if (query.isLoading) return <main className={styles.state}>Opening the story…</main>; if (!article) return <main className={styles.state}>This journal entry is unavailable.</main>; return <article className={styles.page}><header><Link to="/journal"><ArrowLeft aria-hidden="true" />Journal</Link><p>{article.eyebrow ?? "AVELIS journal"}</p><h1>{article.title}</h1><span>{article.excerpt}</span><small>{article.authorName} · {article.readingTimeMinutes} min read</small></header>{article.coverImageUrl ? <img className={styles.cover} alt="" src={article.coverImageUrl} /> : null}<div className={styles.body}>{article.body.split(/\n{2,}/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>; }
