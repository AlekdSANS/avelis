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
    document.documentElement.style.setProperty("--app-body-bg", theme.surface);

    return () => {
      document.documentElement.style.removeProperty("--app-body-bg");
    };
  }, [theme.surface]);

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
    "--home-text": theme.textColor,
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
