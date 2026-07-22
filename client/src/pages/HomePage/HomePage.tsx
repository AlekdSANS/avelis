import type { CSSProperties } from "react";

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
  const themeProperties = {
    "--home-accent": theme.accent,
    "--home-accent-dark": theme.accentDark,
    "--home-button-text": theme.buttonTextColor,
    "--home-text": theme.textColor,
  } as CSSProperties;

  return (
    <div className={styles.home} style={themeProperties}>
      <DynamicHero theme={theme} />
      <FeaturedFragrances />
      <CollectionShowcase />
      <BrandStorySection />
      <FragranceFamilies />
      <FragranceFinderSection />
      <HomepageNewsletter />
    </div>
  );
}
