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
import { getMockResponse } from '../../utils/mockCalendarAssistant';
import { checkAuthStatus } from '../../utils/calendarService';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', content: "Hi! I'm your AI calendar assistant. How can I help you schedule your day?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isFirstQuery, setIsFirstQuery] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
    };
    
    checkAuth();
  }, []);
  
  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || isListening) return;

    // If this is the first query, set isFirstQuery to false
    if (isFirstQuery) {
      setIsFirstQuery(false);
    }

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

    // Fetch response from mock assistant
    try {
      console.log('Sending prompt to mock assistant:', userPrompt);
      const botResponse = await getMockResponse(userPrompt);
      console.log('Received response from mock assistant:', botResponse);
      
      // Remove the typing message and add the real response
      setMessages((prev) => prev.filter(msg => !msg.isTyping)
        .concat([{ sender: 'bot', content: botResponse }]));
    } catch (error) {
      console.error('Error from mock assistant:', error);
      // Remove the typing message
      setMessages((prev) => prev.filter(msg => !msg.isTyping));
      
      // Add more descriptive error message
      const errorMessage = error.message || 'An unknown error occurred';
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        content: `Sorry, I encountered an error connecting to the AI service: ${errorMessage}` 
      }]);
      
      setError(`Failed to connect to mock assistant: ${errorMessage}`);
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

  // Function to handle microphone button click
  const handleMicClick = () => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      
      // Use the appropriate Speech Recognition API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Voice recognition activated');
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Result received:', transcript);
        setInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        console.log('Voice recognition ended');
      };
      
      recognition.start();
    } else {
      console.error('Speech recognition not supported in this browser');
      setError('Speech recognition is not supported in your browser');
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
        <ProfileMenu isAuthenticated={isAuthenticated} />
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
        {/* Welcome Message - show only before first query */}
        {isFirstQuery && (
          <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
            Hi there, <span style={{ color: '#9c27b0' }}>ready to start?</span>
          </Typography>
        )}
        
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
          disabled={isLoading || isListening}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
        />
        {/* Microphone Button */}
        <IconButton 
          onClick={handleMicClick}
          disabled={isLoading}
          sx={{ 
            ml: 1,
            color: isListening ? 'error.main' : 'default',
            animation: isListening ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)'
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)'
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)'
              }
            }
          }}
        >
          <MicrophoneIcon />
        </IconButton>
        {/* Send Button */}
        <IconButton 
          onClick={handleSend} 
          sx={{ ml: 1 }}
          disabled={isLoading || isListening || !input.trim()}
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
