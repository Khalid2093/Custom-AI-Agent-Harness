You are an experienced Senior Software developer.

Your task is to go through packages/ai directory, understand it and plan to add a new provider in this project as "Capgemini". The most important thing is that in this process, it might happen that one or the other steps is lost, for example the provider and models are attached but authentication or any api feature which is present for other providers and models is missed, which might hamper the working later on.

Your task is to create a structured plan as to how you will approach it, and create subtasks which will help achieve the final goal from the start till end. Obviously this wont be possible without a clear idea of the whole directory in question, which is packages/ai.

Details of the new provider:
 Provider: "Capgemini"
 Models: {amazon.nova-micro-v1:0,
                amazon.nova-pro-v1:0,
                amazon.nova-lite-v1:0,
                anthropic.claude-sonnet-4-20250514-v1:0,
                anthropic.claude-sonnet-4-5-20250929-v1:0,
                anthropic.claude-haiku-4-5-20251001-v1:0,
                anthropic.claude-sonnet-4-6,
                mistral.mistral-7b-instruct-v0:2,
                mistral.mistral-large-2402-v1:0,
                mistral.devstral-2-123b,
                gemini-2.5-flash-lite,
                gemini-3.5-flash,
                phi-4-mini-reasoning}

API_BASE_URL=https://openai.generative-eu.engine.capgemini.com/v1


Below is a demo javascript function representing the structure of the request body sent to the api
export async function generateAnswer({ systemPrompt, userPrompt }) {
  <!-- if (!API_BASE_URL || !API_KEY) {
    throw new Error("Missing API_BASE_URL or API_KEY in environment.");
  } -->

  const url = `${API_BASE_URL}/chat/completions`;
  const body = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    model: CHAT_MODEL(any model from the models list),
    max_completion_tokens: 512,
    temperature: 0.2,
    top_p: 1,
    stream: false,
    seed: 0
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const msg = await safeReadText(res);
    throw new Error(`Chat API failed (${res.status}): ${msg}`);
  }

  const json = await res.json();

  // Common shapes:
  // { choices: [ { message: { content: "..." } } ] }
  // or { output_text: "..." }
  const content =
    json?.choices?.[0]?.message?.content ||
    json?.output_text ||
    "";

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Chat API returned empty content.");
  }

  return content.trim();
}

Example Response (All responses will follow this structure):
{
    "id_": "b9558e2f-2fef-4625-a545-05dce784a4c4",
    "choices": [
        {
            "finish_reason": "stop",
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Hello! How can I help you today? If you have any questions or need assistance with something, feel free to let me know. Whether it's information, advice, or just a chat, I'm here to help.",
                "id_": "3616f131-bae0-410f-b995-431baa1b2ccb"
            }
        }
    ],
    "model": "amazon.nova-lite-v1:0",
    "created": 1775832606,
    "system_fingerprint": "v1.0.0",
    "object_": "chat.completion",
    "usage": {
        "completion_tokens": 48,
        "prompt_tokens": 3,
        "total_tokens": 51
    }
}

IMPORTANT: You have to use the request and response reference provided in accordance with the code base's strucure, implementing this provider in the same way how others are implemented to maintain consistency.

Do not compromise and make assumptions on your own.