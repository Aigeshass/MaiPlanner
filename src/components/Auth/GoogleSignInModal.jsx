import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Dialog,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Mock Google account data
const mockAccount = {
  name: 'Aigerim Kubanychbekova',
  email: 'aigerimk047@gmail.com',
  avatar: 'A'
};

const GoogleSignInModal = ({ open, onClose, onSelectAccount }) => {
  const handleAccountSelect = () => {
    // Instead of directly logging in, we now move to the consent screen
    if (onSelectAccount) {
      onSelectAccount(mockAccount);
    }
    // Don't close modal here, as onSelectAccount will handle UI changes
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '400px',
          maxWidth: '90vw',
          borderRadius: '8px',
          bgcolor: '#202124',
          color: '#e8eaed'
        }
      }}
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            color: '#9aa0a6'
          }} 
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        
        {/* Google Logo - Full and clear */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img 
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_74x24dp.png" 
            alt="Google" 
            style={{ height: 24 }}
          />
        </Box>
        
        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Sign in with Google
        </Typography>
        
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 400 }}>
          Choose an account
        </Typography>
        
        {/* MaiPlanner Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{
              fontSize: '1.5rem',
              fontFamily: '"Quicksand", "Poppins", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.5px',
              backgroundImage: 'linear-gradient(90deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              textRendering: 'optimizeLegibility',
            }}
          >
            MaiPlanner
          </Typography>
        </Box>
        
        {/* Account Selection - With white text */}
        <Paper 
          sx={{ 
            p: 2, 
            mb: 2, 
            bgcolor: 'rgba(255,255,255,0.08)', 
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.12)',
            }
          }}
          onClick={handleAccountSelect}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: '#9c27b0', 
                width: 40, 
                height: 40, 
                fontSize: '1.2rem',
                mr: 2 
              }}
            >
              {mockAccount.avatar}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>{mockAccount.name}</Typography>
              <Typography variant="body2" sx={{ color: '#9aa0a6' }}>
                {mockAccount.email}
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Button 
          variant="outlined" 
          fullWidth 
          sx={{ 
            mb: 3, 
            color: '#8ab4f8',
            borderColor: '#8ab4f8',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#8ab4f8',
              bgcolor: 'rgba(138, 180, 248, 0.08)'
            }
          }}
        >
          Use another account
        </Button>
        
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)', mb: 2 }} />
        
        {/* Footer with Google Help link */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Link href="/privacy-policy" underline="hover" color="#9aa0a6" target="_blank" fontSize="0.8rem">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" underline="hover" color="#9aa0a6" target="_blank" fontSize="0.8rem">
            Terms of Service
          </Link>
          <Link href="https://support.google.com/accounts/" underline="hover" color="#9aa0a6" target="_blank" fontSize="0.8rem">
            Help
          </Link>
        </Box>
      </Box>
    </Dialog>
  );
};

export default GoogleSignInModal;
