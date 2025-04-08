// Set up the API key and endpoint
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// Updated endpoint to use the latest PaLM 2 API version
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/text-bison-002:generateContent';

/**
 * Check if API key is configured
 * @returns {boolean}
 */
export const isApiKeyConfigured = () => {
  return !!API_KEY; // Simply check if API key exists
};

/**
 * Generate a response from PaLM 2
 * @param {string} prompt - The input prompt for the model
 * @returns {Promise<string>} - The generated response text
 */
export const getPalm2Response = async (prompt) => {
  if (!isApiKeyConfigured()) {
    console.error('API key is not configured properly');
    throw new Error('PaLM 2 API key is not configured. Please add your API key to the .env file.');
  }
  
  try {
    console.log('Sending request to PaLM 2 API...');
    const startTime = Date.now();
    
    // Updated request format to match the latest PaLM 2 API
    const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
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
          { category: 'HARM_CATEGORY_DEROGATORY', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_TOXICITY', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_VIOLENCE', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUAL', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_MEDICAL', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });
    
    const data = await response.json();
    const elapsedTime = Date.now() - startTime;
    console.log(`Response received in ${elapsedTime}ms`, data);
    
    if (!response.ok) {
      console.error('API Error Details:', data.error);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API error: ${response.status} ${data.error?.message || 'Unknown error'}`);
    }
    
    // Updated response parsing to match the latest PaLM 2 API format
    if (data && data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.warn('Unexpected API response structure:', data);
      return 'No response generated. The model returned an unexpected format.';
    }
  } catch (error) {
    console.error('Error making request to PaLM 2:', error);
    throw new Error('Failed to fetch response from PaLM 2: ' + (error.message || 'Unknown error'));
  }
};
