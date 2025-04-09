import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Mic as MicIcon,
  Send as SendIcon
} from '@mui/icons-material';
import Header from '../Header/Header';

const HomePage = ({ sidebarWidth = '25%' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        bgcolor: 'white',
        width: { xs: '100%', md: `calc(100% - ${sidebarWidth})` },
        marginLeft: { xs: 0, md: sidebarWidth }
      }}
    >
      {/* Header Area */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: { xs: '0.75rem 1rem', md: '1rem 2rem' },
          bgcolor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <Button 
          variant="contained" 
          onClick={handleLoginClick}
          sx={{ 
            mr: { xs: 2, md: 3 }, 
            px: { xs: 2, md: 3 },
            py: { xs: 0.5, md: 0.75 },
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            borderRadius: '6px',
            fontSize: { xs: '0.85rem', md: '0.95rem' }
          }}
        >
          Sign in with Google
        </Button>
        <Avatar sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 } }}>P</Avatar>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 3 }
        }}
      >
        <Typography 
          variant={isMobile ? "h3" : "h2"} 
          component="h1" 
          sx={{ 
            mb: { xs: 4, md: 5 }, 
            textAlign: 'center',
            fontFamily: 'Poppins',
            lineHeight: 1.2
          }}
        >
          <Box component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            Hi there,{' '}
          </Box>
          <Box component="span" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
            ready to start?
          </Box>
        </Typography>
      </Container>

      {/* Scheduling Input Area */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: { xs: 0, md: sidebarWidth },
          right: 0,
          padding: { xs: '1rem 1rem', md: '1rem 2rem' },
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
          zIndex: 10
        }}
      >
        <TextField
          fullWidth
          placeholder="Schedule your event"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ mr: 1, display: { xs: 'none', sm: 'inline-flex' } }}>
                  <MicIcon />
                </IconButton>
                <Button
                  variant="contained"
                  endIcon={!isMobile && <SendIcon />}
                  sx={{ 
                    bgcolor: '#9c27b0',
                    '&:hover': { bgcolor: '#7b1fa2' },
                    px: { xs: 2, md: 3 },
                    minWidth: { xs: 'auto', sm: '80px' }
                  }}
                >
                  {isMobile ? <SendIcon /> : 'Send'}
                </Button>
              </InputAdornment>
            ),
            sx: { 
              borderRadius: '12px', 
              padding: { xs: '2px', md: '4px' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }}
          sx={{ mb: { xs: 1, md: 2 } }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
