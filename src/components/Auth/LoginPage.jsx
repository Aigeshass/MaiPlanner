import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Divider, 
  Link 
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import GoogleSignInModal from './GoogleSignInModal';
import GoogleOAuthConsent from './GoogleOAuthConsent';
import { loginWithGoogle } from '../../utils/calendarService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [showConsentScreen, setShowConsentScreen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  const handleGoogleSignIn = () => {
    setSignInModalOpen(true);
  };
  
  const handleAccountSelect = (account) => {
    setSignInModalOpen(false);
    setSelectedAccount(account);
    setShowConsentScreen(true);
  };
  
  const handleCancel = () => {
    setShowConsentScreen(false);
  };
  
  const handleContinue = async () => {
    // This would be the actual Google OAuth flow in a real app
    try {
      console.log("Simulating Google OAuth login...");
      
      // Store login state
      localStorage.setItem('isAuthenticated', 'true');
      
      // If we had a real backend, we would make an API call here
      // await loginWithGoogle();
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  if (showConsentScreen) {
    return <GoogleOAuthConsent 
      account={selectedAccount} 
      onCancel={handleCancel} 
      onContinue={handleContinue} 
    />;
  }

  return (
    <Box sx={{ 
      bgcolor: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top left logo */}
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Typography 
          variant="h5" 
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
      
      <Container maxWidth="sm" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        py: 8
      }}>
        {/* Centered logo */}
        <Typography 
          variant="h3" 
          sx={{
            fontSize: '2.5rem',
            fontFamily: '"Quicksand", "Poppins", sans-serif',
            fontWeight: 700,
            letterSpacing: '0.5px',
            backgroundImage: 'linear-gradient(90deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            textRendering: 'optimizeLegibility',
            mb: 3
          }}
        >
          MaiPlanner
        </Typography>
        
        {/* Header text */}
        <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
          Sign in to MaiPlanner with your work calendar.
        </Typography>
        
        {/* Google sign-in button */}
        <Button 
          variant="contained" 
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ 
            backgroundColor: '#4285F4',
            color: 'white',
            py: 1.5,
            width: '100%',
            maxWidth: 300,
            mb: 3,
            '&:hover': {
              backgroundColor: '#3367D6'
            }
          }}
        >
          Sign in with Google
        </Button>
        
        {/* Standardized divider with consistent styling */}
        <Divider sx={{ 
          width: '100%', 
          my: 2,
          borderColor: '#e0e0e0'
        }} />
        
        {/* Footer text */}
        <Typography variant="body2" color="text.secondary" align="center">
          By signing in, you agree to MaiPlanner's{' '}
          <Link component={RouterLink} to="/terms-of-service" color="primary">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link component={RouterLink} to="/privacy-policy" color="primary">
            Privacy Policy
          </Link>
        </Typography>
      </Container>

      {/* Google Sign In Modal */}
      <GoogleSignInModal 
        open={signInModalOpen} 
        onClose={() => setSignInModalOpen(false)}
        onSelectAccount={handleAccountSelect}
      />
    </Box>
  );
};

export default LoginPage;
