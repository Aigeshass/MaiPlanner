import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarYearView = ({ events, year }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, overflow: 'auto', height: '70vh' }}>
      <Typography variant="h5" gutterBottom>{year}</Typography>
      
      <Grid container spacing={2}>
        {months.map((month, monthIndex) => (
          <Grid item xs={12} sm={6} md={4} key={monthIndex}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                height: '200px', 
                bgcolor: monthIndex === new Date().getMonth() && year === new Date().getFullYear() 
                  ? 'rgba(66, 133, 244, 0.1)' 
                  : 'white'
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {month}
              </Typography>
              
              {/* Simple mini calendar */}
              <Box sx={{ mt: 1 }}>
                <Grid container>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <Grid item xs={12/7} key={i} sx={{ textAlign: 'center' }}>
                      <Typography variant="caption">{day}</Typography>
                    </Grid>
                  ))}
                  
                  {/* Calendar cells would go here */}
                </Grid>
              </Box>
              
              {/* Event count */}
              {events.filter(event => event.date.getMonth() === monthIndex).length > 0 && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  {events.filter(event => event.date.getMonth() === monthIndex).length} events
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CalendarYearView;
