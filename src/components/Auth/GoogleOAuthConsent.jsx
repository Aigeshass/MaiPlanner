import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
  Avatar,
  Divider,
  Link,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GoogleOAuthConsent = ({ account, onCancel, onContinue }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Default permissions that the app requires
  const [permissions, setPermissions] = useState([
    { id: 'calendar_resources', label: 'View calendar resources on your domain', checked: true },
    { id: 'user_info', label: 'View information about users on your domain', checked: true },
    { id: 'contacts', label: 'Access and download your contacts', checked: true },
    { id: 'calendar_events', label: 'Manage and modify your Google Calendar events', checked: true }
  ]);
  
  // Handle "Select All" toggle
  const [selectAll, setSelectAll] = useState(true);
  
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setPermissions(permissions.map(perm => ({ ...perm, checked: isChecked })));
  };
  
  // Handle individual permission toggle
  const handlePermissionChange = (id) => (event) => {
    const newPermissions = permissions.map(perm => 
      perm.id === id ? { ...perm, checked: event.target.checked } : perm
    );
    
    setPermissions(newPermissions);
    setSelectAll(newPermissions.every(perm => perm.checked));
  };
  
  // Check if Continue should be enabled (at least one permission)
  const isContinueEnabled = permissions.some(perm => perm.checked);

  const handleContinue = async () => {
    setLoading(true);
    
    // First save auth state to localStorage to ensure persistence
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', account?.email || 'aigerimk047@gmail.com');
    localStorage.setItem('userName', account?.name || 'Aigerim Kubanychbekova');
    localStorage.setItem('userAvatar', account?.avatar || 'A');
    
    // Call the onContinue callback if provided
    if (onContinue) {
      try {
        await onContinue();
      } catch (error) {
        console.error("Error in onContinue callback:", error);
      }
    }
    
    // Use a short delay for better UX
    setTimeout(() => {
      // Force navigation to main page as authenticated user
      navigate('/', { replace: true });
      setLoading(false);
    }, 800);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f5f8fa', // Light background color for better readability
        color: '#333333' // Dark text for better visibility
      }}
    >
      {/* Header with Google logo */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: '#4285F4' }}>
        <img 
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_74x24dp.png" 
          alt="Google" 
          style={{ height: 24 }}
        />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          flex: 1, 
          p: 3, 
          maxWidth: '1000px',
          mx: 'auto',
          width: '100%'
        }}
      >
        {/* Left panel */}
        <Box sx={{ flex: 1, mb: { xs: 4, md: 0 }, pr: { xs: 0, md: 4 } }}>
          {/* MaiPlanner logo */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              sx={{
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
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#333333' }}>
            MaiPlanner wants access to your Google Account
          </Typography>
          
          {/* Selected account */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#9c27b0', mr: 2 }}>
              {account?.avatar || 'A'}
            </Avatar>
            <Typography>
              {account?.email || 'aigerimk047@gmail.com'}
            </Typography>
          </Box>
        </Box>
        
        {/* Right panel - Permissions */}
        <Box 
          sx={{ 
            flex: 1, 
            bgcolor: 'rgba(0, 0, 0, 0.05)', // Lighter background for permissions panel
            borderRadius: 2,
            p: 3
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: '#333333' }}>
            Select what MaiPlanner can access
          </Typography>
          
          {/* Select all checkbox */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectAll} 
                onChange={handleSelectAllChange} 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-checked': { color: '#4285F4' }
                }}
              />
            }
            label="Select all"
            sx={{ mb: 2, color: '#333333' }}
          />
          
          <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.12)', mb: 2 }} />
          
          {/* Individual permissions */}
          <Box>
            {permissions.map((permission) => (
              <Box key={permission.id} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={permission.checked} 
                      onChange={handlePermissionChange(permission.id)}
                      sx={{ 
                        color: 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-checked': { color: '#4285F4' }
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ color: '#333333' }}>{permission.label}</Typography>
                      <Link href="#" underline="hover" color="#4285F4" sx={{ fontSize: '0.85rem' }}>
                        Learn more
                      </Link>
                    </Box>
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* Footer */}
      <Box sx={{ p: 3, bgcolor: 'rgba(0, 0, 0, 0.05)' }}>
        <Box maxWidth="1000px" mx="auto">
          <Typography variant="body2" color="#555" sx={{ mb: 2 }}>
            Because you're using Sign in with Google, MaiPlanner will be able to access these items from your account.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={onCancel}
              disabled={loading}
              sx={{ 
                color: '#4285F4',
                borderColor: '#4285F4',
                '&:hover': { borderColor: '#2b6cb0', bgcolor: 'rgba(66, 133, 244, 0.05)' }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleContinue}
              disabled={!isContinueEnabled || loading}
              sx={{ 
                bgcolor: '#4285F4',
                color: 'white',
                '&:hover': { bgcolor: '#2b6cb0' },
                '&.Mui-disabled': { bgcolor: 'rgba(66, 133, 244, 0.5)', color: 'rgba(255, 255, 255, 0.7)' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleOAuthConsent;
