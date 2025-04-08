// OpenAI API integration
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

/**
 * Generate a response from OpenAI
 * @param {string} prompt - The input prompt for the model
 * @returns {Promise<string>} - The generated response text
 */
export const getOpenAIResponse = async (prompt) => {
  try {
    console.log('Sending request to OpenAI API...');
    const startTime = Date.now();
    
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1024
      })
    });
    
    const data = await response.json();
    const elapsedTime = Date.now() - startTime;
    console.log(`Response received in ${elapsedTime}ms`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${data.error?.message || 'Unknown error'}`);
    }
    
    if (data && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return 'No response generated.';
    }
  } catch (error) {
    console.error('Error making request to OpenAI:', error);
    throw new Error('Failed to fetch response: ' + (error.message || 'Unknown error'));
  }
};
