import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const hourLabels = Array.from({ length: 24 }, (_, i) => 
  `${i === 0 ? '12' : i > 12 ? i - 12 : i}${i >= 12 ? ' PM' : ' AM'}`
);

const CalendarDayView = ({ events, date }) => {
  // Filter events for this day
  const dayEvents = events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <Paper elevation={2} sx={{ 
      overflow: 'auto', 
      height: '70vh', 
      backgroundColor: '#ffffff !important', // Force background color
      color: '#202124 !important' // Force text color
    }}>
      <Typography variant="h6" sx={{ 
        p: 2, 
        bgcolor: '#f5f5f5', 
        borderBottom: '1px solid #e0e0e0',
        color: '#202124 !important' // Force text color
      }}>
        {formattedDate}
      </Typography>
      
      <Box sx={{ display: 'flex', height: 'calc(100% - 56px)' }}>
        {/* Time axis */}
        <Box sx={{ width: '60px', borderRight: '1px solid #e0e0e0', flexShrink: 0 }}>
          {hourLabels.map((label, index) => (
            <Box 
              key={index}
              sx={{ 
                height: '60px',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: 'text.secondary'
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
        
        {/* Events area */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {/* Hour grid lines */}
          {hourLabels.map((_, index) => (
            <Divider 
              key={index}
              sx={{ 
                position: 'absolute', 
                top: `${index * 60}px`, 
                left: 0,
                right: 0,
                borderColor: '#e0e0e0'
              }}
            />
          ))}
          
          {/* Events */}
          {dayEvents.map(event => {
            const startHour = event.date.getHours();
            const startMinute = event.date.getMinutes();
            const endHour = event.endDate.getHours();
            const endMinute = event.endDate.getMinutes();
            
            const topPosition = startHour * 60 + startMinute;
            const height = (endHour * 60 + endMinute) - topPosition;
            
            return (
              <Box
                key={event.id}
                className="calendar-event"
                sx={{
                  position: 'absolute',
                  top: `${topPosition}px`,
                  left: '10px',
                  right: '10px',
                  height: `${height}px`,
                  backgroundColor: `${event.color} !important`,
                  color: 'white !important',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    filter: 'brightness(0.9)'
                  }
                }}
                style={{ '--event-color': event.color }} // Set custom property for color
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white !important' }}>
                  {event.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'white !important' }}>
                  {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                  {event.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default CalendarDayView;
