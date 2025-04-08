/**
 * Gemini API Integration
 * Documentation: https://ai.google.dev/gemini-api/docs/quickstart?lang=node
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Checks if the API key is configured
 * @returns {boolean} True if API key exists
 */
export function isApiKeyConfigured() {
  return !!API_KEY;
}

/**
 * Get response from Gemini API
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} The response from Gemini
 */
export async function getGeminiResponse(userMessage) {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please check your environment variables.');
  }

  try {
    console.log('Sending request to Gemini API...');
    const startTime = Date.now();
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { 
                text: `You are a helpful calendar assistant. Help the user with scheduling and planning.
                       The user says: "${userMessage}"` 
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
      }),
    });

    const data = await response.json();
    const elapsedTime = Date.now() - startTime;
    console.log(`Response received in ${elapsedTime}ms`);

    if (!response.ok) {
      console.error('API Error Details:', data.error);
      throw new Error(`Failed to fetch response: ${data.error?.message || response.statusText}`);
    }

    // Extract the text from the response
    if (data.candidates && 
        data.candidates[0]?.content?.parts && 
        data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected response format:', data);
      return 'Sorry, I could not generate a response right now.';
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
