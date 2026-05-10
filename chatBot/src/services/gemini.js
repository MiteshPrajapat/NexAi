import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment variables
// Ensure VITE_GEMINI_API_KEY is set in your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const generateChatResponse = async (prompt, history = []) => {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' }); // Use flash for speed, or pro if specified

    // Convert our internal history format to Gemini's format
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw new Error('Failed to generate response. Please try again later.');
  }
};
