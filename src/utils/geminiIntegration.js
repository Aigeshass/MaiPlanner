/**
 * Mock implementation for Gemini API to avoid authentication issues
 */

import { getMockResponse } from './mockCalendarAssistant';

export async function getGeminiResponse(prompt) {
  console.log("Using mock response instead of Gemini API");
  return getMockResponse(prompt);
}
