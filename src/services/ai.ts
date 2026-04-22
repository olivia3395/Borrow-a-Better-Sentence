import { GoogleGenAI, Type } from "@google/genai";
import { Writer } from "../data/writers";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface RewriteResult {
  rewritten: string;
  toneTag: string;
  reaction: string;
}

export async function rewriteSentence(
  input: string,
  writer: Writer
): Promise<RewriteResult> {
  const systemInstruction = `
    ${writer.systemPrompt}
    
    You must output a JSON object with the following properties:
    1. "rewritten": The rewritten sentence (1-2 sentences max, 55-70 characters max if Chinese).
    2. "toneTag": A very short (3-8 words), witty tag summarizing the emotional tone. It can be English or Chinese.
    3. "reaction": A short, UI-style reaction text in English (like "painfully accurate", "unfortunately elegant", "rude, but fair", "heartbreak with posture", "tragic, but photogenic", "Cold truth, office edition.").

    Remember to strictly capture the specific voice and essence of the writer. Do NOT add any extra markdown wrapping or text outside the JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `User sentence: "${input}"\n\nRewrite this sentence as ${writer.name}.`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rewritten: {
            type: Type.STRING,
            description: "The rewritten sentence.",
          },
          toneTag: {
            type: Type.STRING,
            description: "A witty, short description of the tone.",
          },
          reaction: {
            type: Type.STRING,
            description: "A very short reaction descriptor.",
          },
        },
        required: ["rewritten", "toneTag", "reaction"],
      },
      temperature: 0.8, // Slightly creative but grounded
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate rewritten text from Gemini API.");
  }

  // Parse strings, stripping out potential markdown formatting that can occasionally slip through
  let jsonStr = response.text.trim();
  if (jsonStr.startsWith("\`\`\`json")) {
    jsonStr = jsonStr.substring(7);
  }
  if (jsonStr.endsWith("\`\`\`")) {
    jsonStr = jsonStr.substring(0, jsonStr.length - 3);
  }

  const result: RewriteResult = JSON.parse(jsonStr);
  return result;
}
