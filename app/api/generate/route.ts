import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    let finalPrompt = "";

    if (body.type === "translate") {
      finalPrompt = "Translate this to " + body.targetLanguage + " and keep formatting: " + body.text;
    } else {
      finalPrompt = "Create 3 viral ad concepts for: " + body.prompt + " in " + body.language + " language only.";
    }

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: finalPrompt,
    });

    // @ts-ignore
    const outputText = result.text || "No text generated";

    return Response.json({ text: outputText });
  } catch (e: any) {
    return Response.json({ text: "Error: " + e.message }, { status: 500 });
  }
}