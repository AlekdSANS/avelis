import { ConcentrationGuide } from "../../features/fragranceGuide/components/ConcentrationGuide";
import { FormatGuide } from "../../features/fragranceGuide/components/FormatGuide";
import { FragranceFamilyGrid } from "../../features/fragranceGuide/components/FragranceFamilyGrid";
import { FragranceGuideCta } from "../../features/fragranceGuide/components/FragranceGuideCta";
import { FragranceGuideHero } from "../../features/fragranceGuide/components/FragranceGuideHero";
import { NotesGuide } from "../../features/fragranceGuide/components/NotesGuide";
import { ScentCharacterGrid } from "../../features/fragranceGuide/components/ScentCharacterGrid";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";

export function FragranceGuidePage() {
  useDocumentMetadata({
    title: "Fragrance Guide | AVELIS",
    description:
      "Explore fragrance families, perfume notes, concentration and formats in the AVELIS fragrance guide.",
    canonicalPath: "/fragrance-guide",
  });

  return (
    <div>
      <FragranceGuideHero />
      <FragranceFamilyGrid />
      <NotesGuide />
      <ConcentrationGuide />
      <FormatGuide />
      <ScentCharacterGrid />
      <FragranceGuideCta />
    </div>
  );
}
