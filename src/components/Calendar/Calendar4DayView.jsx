import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';

const hourLabels = Array.from({ length: 24 }, (_, i) => 
  `${i === 0 ? '12' : i > 12 ? i - 12 : i}${i >= 12 ? ' PM' : ' AM'}`
);

const Calendar4DayView = ({ events, date }) => {
  // Get the current day and the next 3 days
  const fourDays = Array.from({ length: 4 }, (_, i) => {
    const day = new Date(date);
    day.setDate(date.getDate() + i);
    return day;
  });
  
  // Format the date range for display
  const rangeStart = new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric'
  }).format(fourDays[0]);
  
  const rangeEnd = new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(fourDays[3]);

  return (
    <Paper elevation={2} sx={{ overflow: 'auto', height: '70vh' }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        {rangeStart} - {rangeEnd}
      </Typography>
      
      {/* Days header */}
      <Grid container sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Grid item xs={1} sx={{ borderRight: '1px solid #e0e0e0' }}>
          <Box sx={{ p: 1, height: '50px' }}></Box>
        </Grid>
        
        {fourDays.map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <Grid 
              item 
              xs={11/4} 
              key={index}
              sx={{ 
                borderRight: index < 3 ? '1px solid #e0e0e0' : 'none',
                bgcolor: isToday ? 'rgba(66, 133, 244, 0.1)' : 'transparent'
              }}
            >
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: isToday ? 'bold' : 'normal',
                    color: isToday ? 'primary.main' : 'text.primary'
                  }}
                >
                  {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day)}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: isToday ? 'bold' : 'normal',
                    color: isToday ? 'primary.main' : 'text.primary'
                  }}
                >
                  {day.getDate()}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Week grid */}
      <Box sx={{ display: 'flex', height: 'calc(100% - 106px)' }}>
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
        
        {/* Days grid */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {fourDays.map((day, dayIndex) => {
            const dayEvents = events.filter(event => 
              event.date.getDate() === day.getDate() &&
              event.date.getMonth() === day.getMonth() &&
              event.date.getFullYear() === day.getFullYear()
            );
            
            return (
              <Box 
                key={dayIndex}
                sx={{ 
                  position: 'relative', 
                  flexGrow: 1, 
                  borderRight: dayIndex < 3 ? '1px solid #e0e0e0' : 'none',
                  height: '1440px' // 24 hours * 60 pixels
                }}
              >
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
                      sx={{
                        position: 'absolute',
                        top: `${topPosition}px`,
                        left: '2px',
                        right: '2px',
                        height: `${height}px`,
                        backgroundColor: event.color,
                        color: 'white',
                        borderRadius: '2px',
                        padding: '2px 4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        '&:hover': {
                          filter: 'brightness(0.9)'
                        }
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                        {event.title}
                      </Typography>
                      {height > 40 && (
                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                          {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                          {event.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default Calendar4DayView;
