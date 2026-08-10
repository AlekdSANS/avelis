export const MANAGED_PRODUCT_KEY = /^products\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp)$/i;
export function assertManagedProductKey(storageKey) {
    if (!MANAGED_PRODUCT_KEY.test(storageKey)) {
        throw new Error("INVALID_PRODUCT_STORAGE_KEY");
    }
}
//# sourceMappingURL=imageStorage.js.map