const OLLAMA_API_BASE = 'http://localhost:11434/api';
const OLLAMA_GENERATE_ENDPOINT = `${OLLAMA_API_BASE}/generate`;

/**
 * Send a prompt to the local Llama 3 model
 * @param {string} userMessage - User's message
 * @returns {Promise<string>} - The model's response
 */
export async function getLocalLlmResponse(userMessage) {
  try {
    const systemPrompt = `You are MaiPlanner's calendar and scheduling assistant. 
- Help users schedule events, meetings, and tasks
- Extract dates, times, and event details from user requests
- Provide clear, concise responses focused on scheduling
- When scheduling is requested, format dates as YYYY-MM-DD and times as HH:MM`;

    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;

    const response = await fetch(OLLAMA_GENERATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:8b',
        prompt: fullPrompt,
        stream: false,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error('Ollama returned an empty response');
    }
    
    return data.response;
  } catch (error) {
    console.error('Error calling local LLM:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Could not connect to Ollama. Make sure it is running on your machine.');
    }
    throw new Error(`Failed to get response from local LLM: ${error.message}`);
  }
}

/**
 * Check if the local LLM server is running and the required model is available
 * @returns {Promise<boolean>} - True if server is running and model is available
 */
export async function checkLocalLlmStatus() {
  try {
    // Check if the server is running
    const response = await fetch(`${OLLAMA_API_BASE}/tags`);
    if (!response.ok) {
      console.error(`Failed to connect to Ollama server: ${response.status}`);
      return false;
    }

    // Check if the required model is available
    const data = await response.json();
    const hasLlama3 = data.models?.some((model) => model.name.includes('llama3') || model.name.includes('llama:3'));
    if (!hasLlama3) {
      console.error('Llama3 model not found on Ollama server.');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking Ollama server status:', error.message);
    return false;
  }
}
