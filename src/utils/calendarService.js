/**
 * Calendar Service - Mock implementation
 */

/**
 * Check authentication status with Google Calendar
 * @returns {Promise<boolean>} True if user is authenticated
 */
export const checkAuthStatus = async () => {
  // Mock implementation - returns false for now
  return false;
};

/**
 * Start the Google OAuth flow
 */
export const initiateLogin = () => {
  // Mock redirect for development
  console.log('Initiating Google login flow...');
  window.location.href = '/auth-callback?mock=true';
};

/**
 * Get calendar events (mock implementation)
 * @returns {Promise<Array>} List of calendar events
 */
export function getCalendarEvents() {
  return Promise.resolve([
    {
      id: '1',
      summary: 'Team Meeting',
      start: { dateTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() },
      end: { dateTime: new Date(new Date().getTime() + 25 * 60 * 60 * 1000).toISOString() },
    },
    {
      id: '2',
      summary: 'Project Review',
      start: { dateTime: new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString() },
      end: { dateTime: new Date(new Date().getTime() + 49 * 60 * 60 * 1000).toISOString() },
    },
    {
      id: '3',
      summary: 'Client Call',
      start: { dateTime: new Date(new Date().getTime() + 72 * 60 * 60 * 1000).toISOString() },
      end: { dateTime: new Date(new Date().getTime() + 73 * 60 * 60 * 1000).toISOString() },
    },
  ]);
}
