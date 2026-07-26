import { useState } from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import type { FragranceNoteType, Product } from "../../../types/product";
import { noteLayers } from "../data/fragranceGuideContent";
import { getNotesByLayer } from "../utils/guideCatalogue";
import { buildGuideShopHref } from "../utils/shopLinks";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

type NoteExplorerProps = {
  products: Product[];
  status: "loading" | "error" | "ready";
};

export function NoteExplorer({ products, status }: NoteExplorerProps) {
  const [activeLayer, setActiveLayer] = useState<FragranceNoteType>("TOP");
  const notes = getNotesByLayer(products, activeLayer);

  return (
    <div className={styles.noteExplorer}>
      <div className={styles.noteExplorerHeading}>
        <div>
          <p className={styles.eyebrow}>Notes from the AVELIS catalogue</p>
          <h3>Follow a material that interests you</h3>
        </div>
        <div aria-label="Choose a fragrance layer" className={styles.noteControls}>
          {noteLayers.map((layer) => (
            <button
              aria-pressed={activeLayer === layer.key}
              key={layer.key}
              onClick={() => setActiveLayer(layer.key)}
              type="button"
            >
              {layer.name.replace(" notes", "")}
            </button>
          ))}
        </div>
      </div>

      {status === "loading" ? (
        <div
          aria-busy="true"
          aria-label="Loading fragrance notes"
          className={styles.noteChips}
        >
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton className={styles.noteChipSkeleton} key={index} />
          ))}
        </div>
      ) : null}

      {status !== "loading" && notes.length > 0 ? (
        <ul aria-live="polite" className={styles.noteChips}>
          {notes.map((note) => (
            <li key={note.name}>
              <Link to={buildGuideShopHref({ note: note.name })}>
                {note.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {status !== "loading" && notes.length === 0 ? (
        <p className={styles.noteEmpty}>
          Fragrance notes will appear here as the catalogue grows.
        </p>
      ) : null}
    </div>
  );
}
