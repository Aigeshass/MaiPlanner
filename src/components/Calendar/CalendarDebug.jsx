import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

/**
 * Debug component to help identify rendering issues
 */
const CalendarDebug = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        m: 4, 
        backgroundColor: 'white', 
        border: '2px solid red' 
      }}
    >
      <Typography variant="h5" color="error" sx={{ mb: 2 }}>
        Calendar Debug Mode
      </Typography>
      
      <Typography paragraph sx={{ color: '#202124' }}>
        If you can see this text, React rendering is working.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="contained" color="error">
          Error Button
        </Button>
      </Box>
      
      <Box sx={{ 
        p: 2, 
        backgroundColor: '#4285F4', 
        color: 'white', 
        borderRadius: 1,
        mb: 2
      }}>
        This is a blue box with white text (Calendar Event Sample)
      </Box>
      
      <Box sx={{ 
        p: 2, 
        backgroundColor: '#0B8043', 
        color: 'white', 
        borderRadius: 1 
      }}>
        This is a green box with white text (Calendar Event Sample)
      </Box>
    </Paper>
  );
};

export default CalendarDebug;
