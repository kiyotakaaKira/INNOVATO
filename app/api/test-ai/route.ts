import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  const baseUrl = process.env.FEATHERLESS_BASE_URL || "https://api.featherless.ai/v1";
  const model = process.env.FEATHERLESS_MODEL || "huihui-ai/Llama-3.1-Nemotron-70B-Instruct-HF-abliterated";

  const payload = {
    model,
    messages: [
      { role: "user", content: "Hello" }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  };

  console.log("[Test AI API] Configuration:", {
    baseUrl,
    model,
    hasApiKey: !!apiKey,
    payload
  });

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const statusText = response.statusText;
    
    let rawJsonResponse = null;
    let rawTextResponse = null;

    try {
      rawJsonResponse = await response.json();
    } catch (e) {
      // If it fails to parse as JSON, get raw text
      rawTextResponse = await response.text();
    }

    const result = {
      statusCode: status,
      statusText,
      rawJsonResponse,
      rawTextResponse,
      error: !response.ok ? `Request failed with status ${status}` : null
    };

    console.log("[Test AI API] Result:", JSON.stringify(result, null, 2));

    return NextResponse.json(result, { status: 200 }); // Always return 200 so the browser displays the JSON

  } catch (error: any) {
    console.error("[Test AI API] Catastrophic Error:", error.message, error.stack);
    
    return NextResponse.json({
      statusCode: 500,
      error: error.message,
      stack: error.stack,
      rawJsonResponse: null
    }, { status: 200 }); // Always return 200 so the browser displays the JSON
  }
}
