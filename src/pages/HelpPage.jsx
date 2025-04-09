import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpPage = () => {
  return (
    <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Help Center
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Frequently Asked Questions
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I create a new event?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can create a new event by navigating to the Calendar View and clicking on any time slot. 
              Alternatively, you can ask the AI assistant to schedule an event by typing something like 
              "Schedule a meeting tomorrow at 2 PM".
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I connect my Google Calendar?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Click on the "Log In" button in the top right corner, then select "Sign in with Google". 
              Follow the prompts to authorize MaiPlanner to access your Google Calendar.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>What can the AI assistant help me with?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The AI assistant can help you schedule events, find available time slots, check your upcoming 
              meetings, and manage your calendar. Simply type your request in the chat interface on the Dashboard.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I change my time zone?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Go to Settings and select your preferred time zone from the dropdown menu in the Calendar Settings section.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Contact Support
        </Typography>
        <Typography paragraph>
          If you need additional help, please contact our support team at <Link href="mailto:support@maiplanner.com">support@maiplanner.com</Link>.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Tutorial Videos
        </Typography>
        <Typography paragraph>
          Check out our tutorial videos to get the most out of MaiPlanner:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Link href="#" underline="hover">Getting Started with MaiPlanner</Link>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Link href="#" underline="hover">Using the AI Assistant</Link>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Link href="#" underline="hover">Advanced Calendar Management</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default HelpPage;
