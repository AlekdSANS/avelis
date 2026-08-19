import { useEffect, useRef, type CSSProperties } from "react";

import { BrandStorySection } from "../../features/homepage/components/BrandStorySection";
import { CollectionShowcase } from "../../features/homepage/components/CollectionShowcase";
import { DynamicHero } from "../../features/homepage/components/DynamicHero";
import { FeaturedFragrances } from "../../features/homepage/components/FeaturedFragrances";
import { FragranceFamilies } from "../../features/homepage/components/FragranceFamilies";
import { FragranceFinderSection } from "../../features/homepage/components/FragranceFinderSection";
import { HomepageNewsletter } from "../../features/homepage/components/HomepageNewsletter";
import { useFeaturedTheme } from "../../features/homepage/hooks/useFeaturedTheme";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const theme = useFeaturedTheme();
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const documentRoot = document.documentElement;

    documentRoot.style.setProperty("--app-body-bg", theme.surface);
    documentRoot.style.setProperty("--color-bg", theme.surface);
    documentRoot.style.setProperty("--color-border", theme.borderColor);
    documentRoot.style.setProperty("--color-olive", theme.accentDark);
    documentRoot.style.setProperty("--color-section-surface", theme.sectionSurface);
    documentRoot.style.setProperty("--color-surface", theme.sectionSurface);
    documentRoot.style.setProperty("--color-text", theme.textColor);
    documentRoot.style.setProperty("--color-text-muted", theme.textMutedColor);
    documentRoot.style.setProperty("--color-text-soft", theme.textSoftColor);
    documentRoot.style.setProperty("--home-header-text", theme.headerTextColor);
    documentRoot.dataset.homeHeroTone = theme.heroTone;

    return () => {
      documentRoot.style.removeProperty("--app-body-bg");
      documentRoot.style.removeProperty("--color-bg");
      documentRoot.style.removeProperty("--color-border");
      documentRoot.style.removeProperty("--color-olive");
      documentRoot.style.removeProperty("--color-section-surface");
      documentRoot.style.removeProperty("--color-surface");
      documentRoot.style.removeProperty("--color-text");
      documentRoot.style.removeProperty("--color-text-muted");
      documentRoot.style.removeProperty("--color-text-soft");
      documentRoot.style.removeProperty("--home-header-text");
      delete documentRoot.dataset.homeHeroTone;
    };
  }, [
    theme.accentDark,
    theme.borderColor,
    theme.headerTextColor,
    theme.heroTone,
    theme.sectionSurface,
    theme.surface,
    theme.textColor,
    theme.textMutedColor,
    theme.textSoftColor,
  ]);

  useEffect(() => {
    const root = homeRef.current;

    if (!root) {
      return;
    }

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > section"),
    ).slice(1);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    sections.forEach((section) => {
      section.dataset.homeReveal = prefersReducedMotion ? "revealed" : "pending";
    });

    if (prefersReducedMotion) {
      return () => {
        sections.forEach((section) => {
          delete section.dataset.homeReveal;
        });
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          section.dataset.homeReveal = "revealed";
          observer.unobserve(section);
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.16,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        delete section.dataset.homeReveal;
      });
    };
  }, []);

  const themeProperties = {
    "--home-accent": theme.accent,
    "--home-accent-dark": theme.accentDark,
    "--home-accent-soft": theme.accentSoft,
    "--home-border": theme.borderColor,
    "--home-button-text": theme.buttonTextColor,
    "--home-glass": theme.glassBackground,
    "--home-glass-border": theme.glassBorder,
    "--home-body-bg": theme.surface,
    "--home-hero-bg": theme.heroBackground,
    "--home-surface": theme.surface,
    "--home-surface-alt": theme.surfaceAlt,
    "--home-text": theme.headerTextColor,
    "--color-bg": theme.surface,
    "--color-section-surface": theme.sectionSurface,
    "--color-text": theme.textColor,
    "--color-text-muted": theme.textMutedColor,
    "--color-text-soft": theme.textSoftColor,
  } as CSSProperties;

  return (
    <div className={styles.home} ref={homeRef} style={themeProperties}>
      <DynamicHero theme={theme} />
      <FeaturedFragrances activeSlug={theme.collectionSlug} />
      <CollectionShowcase />
      <BrandStorySection theme={theme} />
      <FragranceFamilies />
      <FragranceFinderSection />
      <HomepageNewsletter />
    </div>
  );
}
