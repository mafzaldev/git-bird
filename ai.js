import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getCommitMessages(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstructions: `You don't need to hallucinate the commit messages. Just generate five distinct commit messages for the given diff.`,
  });

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split("\n")
    .map((msg) => msg.replace(/^\*\s*/, "").trim())
    .filter((msg) => msg.length > 0)
    .map((msg) => ({ name: msg, value: msg }));
}
