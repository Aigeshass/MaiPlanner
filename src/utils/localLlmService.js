/**
 * Integration with local Ollama LLM service
 * Provides functions to communicate with the Ollama API running locally
 */

const OLLAMA_API_URL = 'http://localhost:11434/api';
const DEFAULT_MODEL = 'llama3:8b';

/**
 * Check if Ollama service is running
 * @returns {Promise<boolean>} True if Ollama is available
 */
export async function checkOllamaStatus() {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/tags`);
    const data = await response.json();
    return response.ok && Array.isArray(data.models);
  } catch (error) {
    console.error('Ollama service check failed:', error);
    return false;
  }
}

/**
 * Create a system prompt to guide the LLM's behavior
 * @param {string} userMessage - The user input to provide context
 * @returns {string} - The formatted system prompt
 */
function createSystemPrompt(userMessage) {
  return `You are a helpful and friendly calendar assistant called MaiPlanner.
Your job is to help users manage their schedule, create events, and organize their time efficiently.

When a user asks you to schedule something:
- Extract the date, time, duration, and purpose
- Format your response to clearly indicate these details
- If information is missing, ask follow-up questions

If the user's request doesn't relate to scheduling or time management, politely explain that you're a calendar assistant
and try to steer the conversation back to scheduling-related topics.

Use a friendly, professional tone. Keep responses concise but helpful.

USER REQUEST: ${userMessage}`;
}

/**
 * Get a response from the local LLM (Ollama)
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - The generated response
 */
export async function getLocalLlmResponse(userMessage) {
  try {
    // Create a well-formatted prompt for better results
    const systemPrompt = createSystemPrompt(userMessage);
    
    console.log('Calling Ollama API with model:', DEFAULT_MODEL);
    
    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        prompt: systemPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40
        }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    return data.response || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error calling Ollama:', error);
    throw new Error(`Failed to get response from local LLM: ${error.message}`);
  }
}

/**
 * Test connection to Ollama
 * @returns {Promise<{success: boolean, message: string, modelName: string|null}>}
 */
export async function testOllamaConnection() {
  try {
    // Step 1: Check if service is running
    const tagsResponse = await fetch(`${OLLAMA_API_URL}/tags`);
    if (!tagsResponse.ok) {
      return { 
        success: false, 
        message: `Ollama service error: ${tagsResponse.status} ${tagsResponse.statusText}`,
        modelName: null
      };
    }
    
    const tagsData = await tagsResponse.json();
    
    // Step 2: Check if our model is available
    const models = tagsData.models || [];
    const hasLlamaModel = models.some(model => model.name === DEFAULT_MODEL);
    
    if (!hasLlamaModel) {
      return {
        success: false,
        message: `Model ${DEFAULT_MODEL} not found. Available models: ${models.map(m => m.name).join(', ')}`,
        modelName: null
      };
    }
    
    // Step 3: Test a simple generation
    const testResponse = await getLocalLlmResponse("Hello, are you working?");
    
    return {
      success: true,
      message: "Ollama connection successful",
      modelName: DEFAULT_MODEL,
      sampleResponse: testResponse
    };
  } catch (error) {
    return {
      success: false,
      message: `Ollama connection error: ${error.message}`,
      modelName: null
    };
  }
}
