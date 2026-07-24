import { useQuery } from "@tanstack/react-query";

import { collectionService } from "../../../services/collectionService";

const collectionKeys = {
  all: ["collections"] as const,
  list: () => [...collectionKeys.all, "list"] as const,
  detail: (slug: string) => [...collectionKeys.all, "detail", slug] as const,
};

export function useCollections() {
  return useQuery({
    queryKey: collectionKeys.list(),
    queryFn: ({ signal }) => collectionService.getCollections({ signal }),
    staleTime: 10 * 60_000,
  });
}

export function useCollection(slug?: string) {
  return useQuery({
    queryKey: collectionKeys.detail(slug ?? ""),
    queryFn: ({ signal }) =>
      collectionService.getCollectionBySlug(slug ?? "", { signal }),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
  });
}
