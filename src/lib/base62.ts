import { bigIntToBuffer, bufferToBigInt } from "@/lib/utils";

const CHARSET =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function encodeBase62(input: Buffer): string {
	let result = "";
	let combined = bufferToBigInt(input);

	while (combined > BigInt("0")) {
		const index = Number(combined % BigInt("62"));
		result = CHARSET[index] + result;
		combined /= BigInt("62");
	}

	return result;
}

export function decodeBase62(input: string): Buffer {
	let result = BigInt("0");
	for (let i = 0; i < input.length; i++) {
		result = result * BigInt("62") + BigInt(CHARSET.indexOf(input[i]));
	}

	return bigIntToBuffer(result);
}
