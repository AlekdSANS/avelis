import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import type { InformationPageContent } from "./informationPages";
import styles from "./InformationPage.module.scss";

type InformationPageProps = {
  content: InformationPageContent;
};

function isInternalLink(href: string) {
  return href.startsWith("/");
}

export function InformationPage({ content }: InformationPageProps) {
  useDocumentMetadata({
    title: `${content.title} | AVELIS`,
    description: content.description,
    canonicalPath: content.canonicalPath,
  });

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
          {content.updated ? (
            <p className={styles.updated}>
              <Clock3 aria-hidden="true" />
              Last reviewed {content.updated}
            </p>
          ) : null}
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.index}>
          <p>On this page</p>
          <nav aria-label={`${content.title} sections`}>
            <ol>
              {content.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className={styles.content}>
          {content.notice ? (
            <div className={styles.notice} role="note">
              <strong>Before commercial launch</strong>
              <p>{content.notice}</p>
            </div>
          ) : null}

          {content.sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <div className={styles.sectionNumber}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.links ? (
                  <div className={styles.sectionLinks}>
                    {section.links.map((link) =>
                      isInternalLink(link.href) ? (
                        <Link key={link.href} to={link.href}>
                          {link.label}
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          key={link.href}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {link.label}
                          <ArrowRight aria-hidden="true" />
                        </a>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className={styles.pageFooter}>
        <p className={styles.eyebrow}>Continue exploring</p>
        <h2>Return to the compositions.</h2>
        <div>
          <Link to="/shop">
            Shop fragrances
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/contact">Contact customer care</Link>
        </div>
      </footer>
    </article>
  );
}
