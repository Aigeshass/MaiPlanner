import React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  IconButton,
  Avatar,
  Paper
} from '@mui/material';
import { 
  Add as AddIcon,
  Mic as MicrophoneIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      {/* Header */}
      <Box 
        component="header"
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          p: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mr: 2, borderRadius: '6px' }}
        >
          Log In
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mr: 2, borderRadius: '6px' }}
        >
          Sign Up
        </Button>
        <Avatar sx={{ width: 36, height: 36 }}>U</Avatar>
      </Box>

      {/* Main Content */}
      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 2 }}>
          Hi there, <span style={{ color: '#9c27b0' }}>ready to start?</span>
        </Typography>
      </Box>

      {/* Scheduling Input Area */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 2, 
          mx: 4, 
          mb: 4, 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton sx={{ mr: 1 }}>
          <AddIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Schedule your event"
          variant="outlined"
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
        />
        <IconButton sx={{ ml: 1 }}>
          <MicrophoneIcon />
        </IconButton>
        <Button 
          variant="contained" 
          sx={{ 
            ml: 2, 
            bgcolor: '#9c27b0', 
            '&:hover': { bgcolor: '#7b1fa2' } 
          }}
          startIcon={<SendIcon />}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;
