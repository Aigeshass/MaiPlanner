import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  IconButton,
  Avatar,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon,
  Mic as MicrophoneIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { getVertexAiResponse } from '../../utils/vertexAiIntegration';

const Dashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'bot', content: "Hi! I'm your AI calendar assistant. How can I help you schedule your day?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { sender: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input and set loading state
    const userPrompt = input;
    setInput('');
    setIsLoading(true);
    setError(null);
    
    // Add a temporary "typing" message from bot
    setMessages((prev) => [...prev, { sender: 'bot', content: '...', isTyping: true }]);

    // Fetch response from Vertex AI
    try {
      console.log('Sending prompt to Vertex AI:', userPrompt);
      const botResponse = await getVertexAiResponse(userPrompt);
      console.log('Received response from Vertex AI:', botResponse);
      
      // Remove the typing message and add the real response
      setMessages((prev) => prev.filter(msg => !msg.isTyping)
        .concat([{ sender: 'bot', content: botResponse }]));
    } catch (error) {
      console.error('Error from Vertex AI:', error);
      // Remove the typing message
      setMessages((prev) => prev.filter(msg => !msg.isTyping));
      
      // Add more descriptive error message
      const errorMessage = error.message || 'An unknown error occurred';
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        content: `Sorry, I encountered an error connecting to the AI service: ${errorMessage}` 
      }]);
      
      setError(`Failed to connect to Vertex AI: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          sx={{ borderRadius: '6px' }}
          onClick={handleLoginClick}
        >
          Log In
        </Button>
      </Box>

      {/* Main Content with Integrated Chat */}
      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 4 },
          overflowY: 'auto',
          bgcolor: '#f8f9fa'
        }}
      >
        {/* Welcome Message */}
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
          Hi there, <span style={{ color: '#9c27b0' }}>ready to start?</span>
        </Typography>
        
        {/* API Status Indicator */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Vertex AI API Status: {isLoading ? 
              <span style={{ color: 'orange' }}>Connecting...</span> : 
              error ? 
                <span style={{ color: 'red' }}>Error</span> : 
                <span style={{ color: 'green' }}>Ready</span>
            }
          </Typography>
        </Box>
        
        {/* Messages container */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mb: 3,
          px: { xs: 1, sm: 3 }
        }}>
          {messages.map((message, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1.5
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  maxWidth: '80%',
                  alignItems: 'flex-start',
                  flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: message.sender === 'user' ? '#1976d2' : '#9c27b0',
                    width: 38,
                    height: 38,
                    m: 0.5
                  }}
                >
                  {message.sender === 'user' ? 'U' : 'AI'}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: message.sender === 'user' ? '#1976d2' : 'white',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    ml: message.sender === 'user' ? 0 : 1,
                    mr: message.sender === 'user' ? 1 : 0,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {message.isTyping ? (
                    <CircularProgress size={20} thickness={4} sx={{ color: '#9c27b0' }} />
                  ) : (
                    <Typography variant="body1">{message.content}</Typography>
                  )}
                </Paper>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Input Area */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 2, 
          mx: 4, 
          mb: 4, 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white'
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
        />
        <IconButton 
          onClick={handleSend} 
          sx={{ ml: 1 }}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Paper>
      
      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
