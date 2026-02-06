import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

export const generateRoutine = async (userRequest: string): Promise<Activity[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an expert scheduler assistant.
    Create a weekly routine based on the user's request.
    Return a JSON array of activities.
    Each activity must have:
    - title (string)
    - description (string, optional, keep it short)
    - day (one of 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
    - startHour (integer 0-23)
    - duration (integer 1-4)
    - color (one of the following exact strings: 
      'bg-blue-200 border-blue-400 text-blue-900', 
      'bg-green-200 border-green-400 text-green-900', 
      'bg-purple-200 border-purple-400 text-purple-900', 
      'bg-amber-200 border-amber-400 text-amber-900', 
      'bg-pink-200 border-pink-400 text-pink-900', 
      'bg-orange-200 border-orange-400 text-orange-900', 
      'bg-teal-200 border-teal-400 text-teal-900', 
      'bg-indigo-200 border-indigo-400 text-indigo-900'
    )
    
    Ensure the schedule is realistic. Do not overlap activities if possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userRequest,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              day: { type: Type.STRING },
              startHour: { type: Type.INTEGER },
              duration: { type: Type.INTEGER },
              color: { type: Type.STRING }
            },
            required: ["title", "day", "startHour", "duration", "color"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const rawActivities = JSON.parse(text);
    
    // Add IDs to the activities
    return rawActivities.map((act: any) => ({
      ...act,
      id: Math.random().toString(36).substr(2, 9)
    }));

  } catch (error) {
    console.error("Error generating routine:", error);
    throw error;
  }
};
