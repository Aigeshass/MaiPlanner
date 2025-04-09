/**
 * Mock Calendar Assistant - Provides pre-written responses for demonstration purposes
 */

// Keywords for detecting query types
const SCHEDULING_KEYWORDS = ['schedule', 'book', 'set up', 'arrange', 'plan', 'create', 'add', 'new'];
const VIEWING_KEYWORDS = ['show', 'view', 'see', 'check', 'what', 'display', 'list', 'upcoming'];
const MODIFYING_KEYWORDS = ['change', 'reschedule', 'move', 'update', 'edit', 'modify', 'cancel', 'delete'];

// Date-related terms
const DATE_TERMS = {
  'today': () => new Date(),
  'tomorrow': () => { 
    const d = new Date(); 
    d.setDate(d.getDate() + 1); 
    return d;
  },
  'next week': () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  }
};

// Time helpers
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Generate mock responses for calendar queries
 * @param {string} userQuery - The user's message
 * @returns {Promise<string>} - A simulated AI response
 */
export async function getMockResponse(userQuery) {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const query = userQuery.toLowerCase();
  
  if (query.includes('schedule') || query.includes('meeting') || query.includes('appointment')) {
    return "I'd be happy to help you schedule that. What day and time works best for you?";
  }
  
  if (query.includes('today') || query.includes('schedule for today')) {
    return "Looking at your calendar for today, you have 3 meetings scheduled. Your next meeting is at 2:00 PM with the design team.";
  }
  
  if (query.includes('tomorrow') || query.includes('schedule for tomorrow')) {
    return "For tomorrow, you have 2 events: a 10:00 AM call with marketing and a 3:00 PM deadline for the quarterly report.";
  }
  
  if (query.includes('free') || query.includes('available') || query.includes('open slot')) {
    return "I see you have availability tomorrow between 1:00 PM and 3:00 PM, or Friday morning before 11:00 AM. Would either of those work?";
  }
  
  if (query.includes('cancel') || query.includes('reschedule')) {
    return "I can help you with that. Which meeting would you like to cancel or reschedule?";
  }
  
  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! I'm your calendar assistant. How can I help you manage your schedule today?";
  }
  
  // Default response
  return "I'm your calendar assistant. I can help you schedule meetings, check your availability, or manage your appointments. What would you like to do?";
}
