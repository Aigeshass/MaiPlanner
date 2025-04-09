import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/Auth/LoginPage';
import StatisticsPage from './pages/StatisticsPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import ChatInterface from './components/ChatDemo/ChatInterface';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { checkAuthStatus } from './utils/calendarService';
import './styles/App.css';
import './styles/PrivacyPolicy.css';
import './styles/Privacy.css';
import './styles/Calendar.css';

// Create auth context
export const AuthContext = createContext();

// Define a more explicit theme with better color contrast
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
      light: 'rgba(100, 108, 255, 0.12)',
    },
    secondary: {
      main: '#535bf2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
    divider: '#e0e0e0'
  },
  typography: {
    fontFamily: '"system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f9fa',
          color: '#202124'
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    }
  }
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for demo
  const [authChecked, setAuthChecked] = useState(true); // Default to true for demo
  
  // Check auth status on mount - using mock implementation
  useEffect(() => {
    // Set authenticated by default for the demo
    setIsAuthenticated(true);
    setAuthChecked(true);
  }, []);
  
  // Auth context value
  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userInfo: {
      name: localStorage.getItem('userName') || 'User',
      email: localStorage.getItem('userEmail') || '',
      avatar: localStorage.getItem('userAvatar') || 'U',
    }
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Dashboard />
                  </Box>
                </Box>
              } />
              <Route path="/statistics" element={
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <StatisticsPage />
                  </Box>
                </Box>
              } />
              <Route path="/calendar" element={
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <CalendarPage />
                  </Box>
                </Box>
              } />
              <Route path="/settings" element={
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <SettingsPage />
                  </Box>
                </Box>
              } />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthContext.Provider>
  );
}

export default App;
