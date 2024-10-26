import { decodeBase62, encodeBase62 } from "@/lib/base62";

describe("base62", () => {
	test("encodeBase62 and decodeBase62 should be reversible", () => {
		const input = Buffer.from("Hello, World!");
		const encoded = encodeBase62(input);
		const decoded = decodeBase62(encoded);
		expect(decoded.toString()).toBe(input.toString());
	});

	test("encodeBase62 should only use allowed characters", () => {
		const input = Buffer.from("Test string");
		const encoded = encodeBase62(input);
		expect(encoded).toMatch(/^[0-9a-zA-Z]+$/);
	});

	test("handles empty input", () => {
		const input = Buffer.from("");
		const encoded = encodeBase62(input);
		expect(encoded).toBe("");
		const decoded = decodeBase62(encoded);
		expect(decoded.toString()).toBe("");
	});

	test("handles special characters", () => {
		const input = Buffer.from("!@#$%^&*()");
		const encoded = encodeBase62(input);
		const decoded = decodeBase62(encoded);
		expect(decoded.toString()).toBe("!@#$%^&*()");
	});

	test("handles unicode characters", () => {
		const input = Buffer.from("你好世界");
		const encoded = encodeBase62(input);
		const decoded = decodeBase62(encoded);
		expect(decoded.toString()).toBe("你好世界");
	});
});
