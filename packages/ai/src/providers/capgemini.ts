import { openAICompletionsApi } from "../api/openai-completions.lazy.ts";
import { envApiKeyAuth } from "../auth/helpers.ts";
import { createProvider, type Provider } from "../models.ts";
import { CAPGEMINI_MODELS } from "./capgemini.models.ts";

export function capgeminiProvider(): Provider<"openai-completions"> {
	return createProvider({
		id: "capgemini",
		name: "Capgemini",
		baseUrl: "https://openai.generative-eu.engine.capgemini.com/v1",
		auth: { apiKey: envApiKeyAuth("Capgemini API key", ["CAPGEMINI_API_KEY"]) },
		models: Object.values(CAPGEMINI_MODELS),
		api: openAICompletionsApi(),
	});
}
