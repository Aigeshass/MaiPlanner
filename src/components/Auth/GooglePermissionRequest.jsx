import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container
} from '@mui/material';
import { 
  Google as GoogleIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as AccessTimeIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GooglePermissionRequest = () => {
  const navigate = useNavigate();
  
  const handleAllow = () => {
    // Set user as logged in
    localStorage.setItem('isLoggedIn', 'true');
    
    // In a real app, this would handle the OAuth permissions grant
    // For now, just redirect to the main app
    navigate('/');
  };
  
  const handleCancel = () => {
    // Go back to account selection
    navigate('/auth/accounts');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f1f3f4'
    }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '8px'
          }}
        >
          {/* Google Logo */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <GoogleIcon sx={{ fontSize: 30, color: '#4285F4', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 500, color: '#5f6368' }}>
              Google
            </Typography>
          </Box>
          
          <Typography variant="h5" sx={{ mb: 1, mt: 2, textAlign: 'center' }}>
            MaiPlanner wants access to your Google Account
          </Typography>
          
          <Typography sx={{ color: '#5f6368', mb: 3, textAlign: 'center' }}>
            This will allow MaiPlanner to:
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: '#f8f9fa',
              p: 2,
              width: '100%',
              borderRadius: '8px'
            }}
          >
            <List disablePadding>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon sx={{ color: '#1a73e8' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="See, edit, share, and permanently delete all the calendars you can access using Google Calendar"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon sx={{ color: '#1a73e8' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="See your free/busy information"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: '#1a73e8' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="See your personal info, including name, email address, and profile picture"
                />
              </ListItem>
            </List>
          </Paper>
          
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              Make sure you trust MaiPlanner
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              You may be sharing sensitive info with this app or website. You can always see or remove access in your Google Account.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            width: '100%',
            mt: 4
          }}>
            <Button 
              onClick={handleCancel}
              sx={{ 
                color: '#1a73e8',
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Cancel
            </Button>
            
            <Button 
              variant="contained"
              onClick={handleAllow}
              sx={{ 
                bgcolor: '#1a73e8',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: '#1765c6'
                }
              }}
            >
              Allow
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GooglePermissionRequest;
