import { getMockResponse } from './mockCalendarAssistant';

/**
 * Mock implementation of Vertex AI response that redirects to mock responses
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - A mock response
 */
export async function getVertexAiResponse(userMessage) {
  console.log('Using mock response instead of Vertex AI');
  return getMockResponse(userMessage);
}
