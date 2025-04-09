import React, { useState } from 'react';
import { Box, Paper, Typography, Avatar, TextField, IconButton, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { getMockResponse } from '../../utils/mockCalendarAssistant';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: "Hi! I'm your AI calendar assistant. How can I help you schedule your day?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Add typing indicator for realistic effect
    setMessages(prev => [...prev, { sender: 'bot', content: '...', isTyping: true }]);
    
    // Simulate typing delay for realism
    const typingDelay = Math.random() * 900 + 300;
    
    setTimeout(() => {
      // Get response from mock assistant (no API calls)
      const botResponse = getMockResponse(input);
      
      // Replace typing indicator with response
      setMessages(prev => 
        prev.filter(msg => !msg.isTyping)
           .concat([{ sender: 'bot', content: botResponse }])
      );
      setIsLoading(false);
    }, typingDelay);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 2 }}>
      {/* Model indicator - now shows we're using a demo mode */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="caption" sx={{ mr: 1 }}>
          Mode: Demo Calendar Assistant
        </Typography>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'success.main',
          }}
        />
      </Box>

      {/* Messages container */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                maxWidth: '80%',
                alignItems: 'flex-start',
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.sender === 'user' ? '#1976d2' : '#9c27b0',
                  width: 38,
                  height: 38,
                  m: 0.5,
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
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
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

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
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
              borderRadius: '8px',
            },
          }}
        />
        <IconButton onClick={handleSend} disabled={isLoading || !input.trim()} sx={{ ml: 1 }}>
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
