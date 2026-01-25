import { GoogleGenAI } from "@google/genai";
import { Skill } from "../types";

const createClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateRecoveryPlan = async (weakSkills: Skill[], targetRole: string): Promise<string> => {
  const ai = createClient();
  if (!ai) return "Unable to generate plan. API Key missing.";

  const weakSkillNames = weakSkills.map(s => s.name).join(", ");
  
  const prompt = `
    You are a career coach. A student targeting the role of "${targetRole}" has the following weak skills: ${weakSkillNames}.
    
    Create a short, actionable 3-step recovery plan. 
    For each step, suggest a specific type of resource (e.g., "Practice LeetCode medium problems", "Watch System Design Prime video").
    Keep it concise and encouraging. 
    Format as a simple HTML list (<ul><li>...</li></ul>) string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No plan generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating plan. Please try again later.";
  }
};
