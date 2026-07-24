import { randomBytes } from "node:crypto";

const ORDER_NUMBER_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const RANDOM_LENGTH = 6;

function formatUtcDate(date: Date) {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return `${year}${month}${day}`;
}

export function generateOrderNumber(date = new Date()) {
	const bytes = randomBytes(RANDOM_LENGTH);
	let suffix = "";

	for (const byte of bytes) {
		suffix += ORDER_NUMBER_ALPHABET[byte % ORDER_NUMBER_ALPHABET.length];
	}

	return `AVELIS-${formatUtcDate(date)}-${suffix}`;
}
