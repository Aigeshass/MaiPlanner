/**
 * Calendar service utility functions
 */

// Login with Google Calendar
export const loginWithGoogle = () => {
  window.location.href = 'http://localhost:5000/auth/google';
};

// Fetch calendar events
export const fetchCalendarEvents = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/calendar/events', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies with request
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Not authenticated');
      }
      throw new Error('Failed to fetch events');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

// Create calendar event
export const createCalendarEvent = async (event) => {
  try {
    const response = await fetch('http://localhost:5000/api/calendar/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
