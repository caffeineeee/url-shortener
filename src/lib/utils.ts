import { encodeBase62 } from "@/lib/base62";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function bufferToBigInt(input: Buffer): bigint {
	if (input.length === 0) return BigInt(0);

	return BigInt(`0x${input.toString("hex")}`);
}

export function bigIntToBuffer(input: bigint): Buffer {
	if (input === BigInt(0)) return Buffer.from("");

	let hex = input.toString(16);
	if (hex.length % 2) {
		// padding
		hex = `0${hex}`;
	}
	const buf = Buffer.from(hex, "hex");
	return buf;
}

// process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://url.caffeineeee.me"
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export function createShortUrl(longUrl: Buffer): string {
	const shortenedId = encodeBase62(longUrl).slice(0, 7); // ex: "aKc3K4b"

	console.log('shortenedId (ex: "aKc3K4b"):', shortenedId);

	return `${BASE_URL}/${shortenedId}`; // ex: http://localhost:3000/aKc3K4b
}
