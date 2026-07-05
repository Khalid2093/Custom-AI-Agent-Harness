import { describe, expect, it } from "vitest";
import { capgeminiProvider } from "../src/providers/capgemini.ts";

describe("capgemini provider (stub)", () => {
	it("constructs provider and exposes models", () => {
		const provider = capgeminiProvider();
		expect(provider.id).toBe("capgemini");
		const models = provider.getModels();
		expect(Array.isArray(models)).toBe(true);
		expect(models.length).toBeGreaterThan(0);
		for (const m of models) {
			expect(m.provider).toBe("capgemini");
			expect(m.api).toBe("openai-completions");
			expect(typeof m.id).toBe("string");
		}
	});
});
