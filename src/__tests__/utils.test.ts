import { bigIntToBuffer, bufferToBigInt } from "@/lib/utils";

describe("buffer conversion utilities", () => {
	test("bufferToBigInt and bigIntToBuffer should be reversible", () => {
		const originalBuffer = Buffer.from("Hello");
		const bigInt = bufferToBigInt(originalBuffer);
		const resultBuffer = bigIntToBuffer(bigInt);
		expect(resultBuffer.toString()).toBe(originalBuffer.toString());
	});

	test("handles empty buffer", () => {
		const emptyBuffer = Buffer.from("");
		const bigInt = bufferToBigInt(emptyBuffer);
		const resultBuffer = bigIntToBuffer(bigInt);
		expect(resultBuffer.toString()).toBe("");
	});

	test("handles large numbers", () => {
		const largeBuffer = Buffer.from("a".repeat(1000));
		const bigInt = bufferToBigInt(largeBuffer);
		const resultBuffer = bigIntToBuffer(bigInt);
		expect(resultBuffer.toString()).toBe(largeBuffer.toString());
	});
});
