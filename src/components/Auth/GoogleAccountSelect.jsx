import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Divider,
  Container
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GoogleAccountSelect = () => {
  const navigate = useNavigate();
  
  const handleAccountSelect = () => {
    navigate('/auth/permissions');
  };
  
  const handleOtherAccount = () => {
    // In a real app, this would open Google's account selection
    // For now, just simulate by redirecting to permissions
    navigate('/auth/permissions');
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
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <GoogleIcon sx={{ fontSize: 30, color: '#4285F4', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 500, color: '#5f6368' }}>
              Google
            </Typography>
          </Box>
          
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 400 }}>
            Choose an account
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, color: '#5f6368', textAlign: 'center' }}>
            to continue to MaiPlanner
          </Typography>
          
          {/* Account Option */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              width: '100%', 
              mb: 2, 
              cursor: 'pointer',
              border: '1px solid #dadce0',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#f8f9fa'
              },
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleAccountSelect}
          >
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mr: 2,
                bgcolor: '#9c27b0'
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography variant="body1">Aigerim Kubanychbekova</Typography>
              <Typography variant="body2" color="text.secondary">aigerimk047@gmail.com</Typography>
            </Box>
          </Paper>
          
          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ 
              mt: 2, 
              borderColor: '#dadce0',
              color: '#1a73e8', 
              textTransform: 'none',
              fontWeight: 500
            }}
            onClick={handleOtherAccount}
          >
            Use another account
          </Button>
          
          <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              To continue, Google will share your name, email address, language preference and profile picture with MaiPlanner.
            </Typography>
          </Box>
          
          <Divider sx={{ width: '100%', my: 3 }} />
          
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              sx={{ 
                color: '#1a73e8', 
                textTransform: 'none',
                fontWeight: 500
              }}
              onClick={() => navigate('/login')}
            >
              Back
            </Button>
            
            <Box>
              <Button 
                sx={{ 
                  color: '#5f6368', 
                  mr: 1,
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Privacy Policy
              </Button>
              <Button 
                sx={{ 
                  color: '#5f6368',
                  textTransform: 'none', 
                  fontWeight: 500
                }}
              >
                Terms of Service
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default GoogleAccountSelect;
