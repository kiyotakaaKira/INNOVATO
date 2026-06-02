interface FeatherlessMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface FeatherlessOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export async function generateFeatherlessCompletion(
  messages: FeatherlessMessage[],
  options: FeatherlessOptions = {}
): Promise<string> {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  const baseUrl = process.env.FEATHERLESS_BASE_URL || "https://api.featherless.ai/v1";
  const model = options.model || process.env.FEATHERLESS_MODEL || "meta-llama/Meta-Llama-3-8B-Instruct";

  if (!apiKey) {
    console.error("Missing FEATHERLESS_API_KEY environment variable");
    throw new Error("AI credentials are not configured properly.");
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Featherless API error:", errorData);
      throw new Error(`Featherless API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }

    throw new Error("No completion generated from Featherless AI.");
  } catch (error) {
    console.error("Featherless service layer error:", error);
    throw error;
  }
}
