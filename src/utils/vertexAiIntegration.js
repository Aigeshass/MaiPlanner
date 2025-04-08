// Set up the API key and endpoint for Vertex AI
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const PROJECT_ID = 'palm-api-456115'; // Replace with your Google Cloud project ID
const LOCATION = 'asia-east2'; // Using your region
const MODEL = 'text-bison@002'; // Vertex AI model name (without the -001)

/**
 * Check if API key is configured
 * @returns {boolean}
 */
export const isApiKeyConfigured = () => {
  return !!API_KEY;
};

/**
 * Generate a response from Vertex AI
 * @param {string} prompt - The input prompt for the model
 * @returns {Promise<string>} - The generated response text
 */
export const getVertexAiResponse = async (prompt) => {
  if (!isApiKeyConfigured()) {
    throw new Error('API key is not configured. Please add your API key to the .env file.');
  }
  
  try {
    console.log('Sending request to Vertex AI...');
    const startTime = Date.now();
    
    // Vertex AI endpoint format
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict?key=${API_KEY}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [
          { prompt: prompt }
        ],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topK: 40,
          topP: 0.95,
        }
      })
    });
    
    const data = await response.json();
    const elapsedTime = Date.now() - startTime;
    console.log(`Response received in ${elapsedTime}ms`, data);
    
    if (!response.ok) {
      console.error('API Error Details:', data.error);
      throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
    }
    
    // Extract the prediction text from Vertex AI response format
    if (data && data.predictions && data.predictions.length > 0) {
      return data.predictions[0].content;
    } else {
      console.warn('Unexpected API response structure:', data);
      return 'No response generated.';
    }
  } catch (error) {
    console.error('Error making request to Vertex AI:', error);
    throw new Error('Failed to fetch response: ' + (error.message || 'Unknown error'));
  }
};
