import React from 'react';
import { 
  Popover, Typography, Box, Divider 
} from '@mui/material';

const HelpPopup = ({ open, anchorEl, handleClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" component="div" gutterBottom>
          Help & Resources
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Welcome to MaiPlanner! Find answers to common questions and learn how to use the app effectively.
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        
        <Typography variant="body2" paragraph>
          <strong>Getting Started:</strong><br />
          Use the Dashboard to see your upcoming tasks and events at a glance. The Calendar shows a detailed view of your schedule, while Statistics helps track your productivity.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Managing Tasks:</strong><br />
          Create new tasks from the Calendar or Dashboard. Add details like due dates, priority levels, and descriptions to stay organized.
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        
        <Typography variant="body2" color="text.secondary">
          Need further assistance? Contact our support team at support@maiplanner.com
        </Typography>
      </Box>
    </Popover>
  );
};

export default HelpPopup;
