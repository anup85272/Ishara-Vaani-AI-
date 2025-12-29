
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
// Always use the named parameter 'apiKey' and do not add default values as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const translateSignSequence = async (landmarks: string, language: 'English' | 'Hindi' = 'English') => {
  // Use gemini-3-flash-preview for real-time sign language interpretation tasks.
  // Directly await ai.models.generateContent to fetch the response.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The following is a list of hand landmark coordinates captured from a sign language speaker: ${landmarks}. 
    Please interpret this sequence and translate it into a clear, fluent ${language} sentence. 
    If the sequence is unclear, provide your best guess or ask for clarification. 
    Respond only with the translated text.`,
  });

  return response.text || "Could not interpret sign.";
};

export const getReverseTranslationInstructions = async (text: string) => {
  // Description of sign performance using a system instruction for context.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Describe how to perform Indian Sign Language (ISL) for the following sentence: "${text}". 
    Provide step-by-step hand movements, facial expressions, and spatial orientation instructions for someone learning the sign.`,
    config: {
        systemInstruction: "You are an Indian Sign Language expert.",
    }
  });
  return response.text;
};

export const getHindiTranslation = async (englishText: string) => {
  // Standard text-to-text translation using the flash model.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following sentence to natural-sounding Hindi: "${englishText}"`,
  });
  return response.text;
};
