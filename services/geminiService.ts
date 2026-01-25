
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getCosmicInsight = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the 'Portfolio Assistant' for Destiny Gogo-fyneface, a world-class AI Engineer based in Liverpool. Destiny was previously a highly skilled Java Engineer and has now specialized in SOTA AI systems. You are knowledgeable about his skills: Java, Python, LLMs, Neural Networks, and Cloud Infrastructure. Provide professional, insightful, and slightly poetic answers about his background. Keep responses under 80 words. If asked for contact info, mention scaihai@gmail.com or his LinkedIn.",
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text || "I'm currently recalibrating my knowledge base. Please feel free to reach out to Destiny directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The connection to my neural memory is flickering. Please try again or contact Destiny via email.";
  }
};
