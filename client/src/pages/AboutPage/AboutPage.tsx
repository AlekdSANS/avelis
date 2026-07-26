import { AboutHero } from "../../features/about/components/AboutHero";
import { BrandIntroduction } from "../../features/about/components/BrandIntroduction";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import styles from "./AboutPage.module.scss";

export function AboutPage() {
  useDocumentMetadata({
    title: "About AVELIS | Fragrance Shaped into Form",
    description:
      "Discover the philosophy behind AVELIS, where niche fragrance, sculptural design and refillable formats become one experience.",
    canonicalPath: "/about",
  });

  return (
    <div className={styles.page}>
      <AboutHero />
      <BrandIntroduction />
    </div>
  );
}
