import { ConcentrationGuide } from "../../features/fragranceGuide/components/ConcentrationGuide";
import { FormatGuide } from "../../features/fragranceGuide/components/FormatGuide";
import { FragranceFamilyGrid } from "../../features/fragranceGuide/components/FragranceFamilyGrid";
import { FragranceGuideCta } from "../../features/fragranceGuide/components/FragranceGuideCta";
import { FragranceGuideHero } from "../../features/fragranceGuide/components/FragranceGuideHero";
import { NotesGuide } from "../../features/fragranceGuide/components/NotesGuide";
import { ScentCharacterGrid } from "../../features/fragranceGuide/components/ScentCharacterGrid";
import { useProducts } from "../../features/products/hooks/useProducts";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";

export function FragranceGuidePage() {
  const catalogueQuery = useProducts({ limit: 48 });
  const catalogueProducts = catalogueQuery.data?.data ?? [];
  const catalogueStatus = catalogueQuery.isLoading
    ? "loading"
    : catalogueQuery.isError
      ? "error"
      : "ready";

  useDocumentMetadata({
    title: "Fragrance Guide | AVELIS",
    description:
      "Explore fragrance families, perfume notes, concentration and formats in the AVELIS fragrance guide.",
    canonicalPath: "/fragrance-guide",
  });

  return (
    <div>
      <FragranceGuideHero />
      <FragranceFamilyGrid
        products={catalogueProducts}
        status={catalogueStatus}
      />
      <NotesGuide products={catalogueProducts} status={catalogueStatus} />
      <ConcentrationGuide />
      <FormatGuide />
      <ScentCharacterGrid />
      <FragranceGuideCta />
    </div>
  );
}
