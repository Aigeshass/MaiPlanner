import React from 'react';
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

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleGoogleSignIn = () => {
    navigate('/auth/accounts');
  };

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
    </Box>
  );
};

export default LoginPage;
