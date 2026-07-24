import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { productService } from "../../../services/productService";
import type { ProductQueryParams } from "../../../types";

const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductQueryParams) => [...productKeys.lists(), params] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
  featured: (limit?: number) => [...productKeys.all, "featured", limit] as const,
  related: (productId: string) => [...productKeys.all, "related", productId] as const,
};

export function useProducts(params: ProductQueryParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ signal }) => productService.getProducts(params, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: productKeys.detail(slug ?? ""),
    queryFn: ({ signal }) => productService.getProductBySlug(slug ?? "", { signal }),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
  });
}

export function useFeaturedProducts(limit?: number) {
  return useQuery({
    queryKey: productKeys.featured(limit),
    queryFn: ({ signal }) => productService.getFeaturedProducts(limit, { signal }),
    staleTime: 5 * 60_000,
  });
}

export function useRelatedProducts(productId?: string) {
  return useQuery({
    queryKey: productKeys.related(productId ?? ""),
    queryFn: ({ signal }) =>
      productService.getRelatedProducts(productId ?? "", { signal }),
    enabled: Boolean(productId),
    staleTime: 5 * 60_000,
  });
}
