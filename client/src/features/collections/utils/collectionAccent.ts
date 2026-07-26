import type { CSSProperties } from "react";

import type { Collection } from "../../../types/collection";

type AccentStyle = CSSProperties & {
  "--collection-accent": string;
};

export function getCollectionAccentStyle(collection: Collection): AccentStyle {
  return {
    "--collection-accent": collection.accentColor ?? "#727052",
  };
}
