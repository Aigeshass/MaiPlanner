import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hourLabels = Array.from({ length: 24 }, (_, i) => 
  `${i === 0 ? '12' : i > 12 ? i - 12 : i}${i >= 12 ? ' PM' : ' AM'}`
);

const CalendarWeekView = ({ events, date }) => {
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  
  // Generate dates for the week
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
  
  // Format the week range for display
  const weekRangeStart = new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric'
  }).format(weekDates[0]);
  
  const weekRangeEnd = new Intl.DateTimeFormat('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(weekDates[6]);

  return (
    <Paper elevation={2} sx={{ overflow: 'auto', height: '70vh' }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        {weekRangeStart} - {weekRangeEnd}
      </Typography>
      
      {/* Week header */}
      <Grid container sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Grid item xs={1} sx={{ borderRight: '1px solid #e0e0e0' }}>
          <Box sx={{ p: 1, height: '50px' }}></Box>
        </Grid>
        
        {weekDates.map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <Grid 
              item 
              xs={11/7} 
              key={index}
              sx={{ 
                borderRight: index < 6 ? '1px solid #e0e0e0' : 'none',
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
                  {weekdays[index]}
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
          {weekDates.map((day, dayIndex) => {
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
                  borderRight: dayIndex < 6 ? '1px solid #e0e0e0' : 'none',
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

export default CalendarWeekView;
