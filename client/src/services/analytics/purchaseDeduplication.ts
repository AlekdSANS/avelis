const PURCHASE_STORAGE_KEY = "avelis.analytics.purchases.v1";
const emittedPurchases = new Set<string>();

function readStoredPurchases(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.sessionStorage.getItem(PURCHASE_STORAGE_KEY);
    const parsedValue = storedValue
      ? (JSON.parse(storedValue) as unknown)
      : [];
    return Array.isArray(parsedValue)
      ? parsedValue.filter(
          (value): value is string => typeof value === "string",
        )
      : [];
  } catch {
    return [];
  }
}

export function hasPurchaseBeenEmitted(transactionId: string): boolean {
  return (
    emittedPurchases.has(transactionId) ||
    readStoredPurchases().includes(transactionId)
  );
}

export function markPurchaseEmitted(transactionId: string): void {
  emittedPurchases.add(transactionId);

  if (typeof window === "undefined") {
    return;
  }

  try {
    const transactionIds = new Set(readStoredPurchases());
    transactionIds.add(transactionId);
    window.sessionStorage.setItem(
      PURCHASE_STORAGE_KEY,
      JSON.stringify([...transactionIds]),
    );
  } catch {
    // The in-memory set still deduplicates the current application session.
  }
}
