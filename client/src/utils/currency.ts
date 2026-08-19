export const STORE_CURRENCY = "EUR" as const;

export function formatCurrency(value: number, currency: string = STORE_CURRENCY) {
	return new Intl.NumberFormat(currency === "EUR" ? "en-IE" : "en", {
		currency,
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
		style: "currency",
	}).format(value);
}
