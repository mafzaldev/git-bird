import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export async function getCommitMessagesWithGemini(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split("\n")
    .map((msg) => msg.replace(/^[\*\-\•]\s*/, "").trim())
    .filter((msg) => msg.length > 0)
    .map((msg) => ({ name: msg, value: msg }));
}

export async function getCommitMessagesWithChatGPT(prompt) {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [{ role: "developer", content: prompt }],
    model: "gpt-4o",
  });

  const result = completion.choices[0].message.content;
  return result
    .split("\n")
    .map((msg) => msg.replace(/^[\*\-\•]\s*/, "").trim())
    .filter((msg) => msg.length > 0)
    .map((msg) => ({ name: msg, value: msg }));
}
