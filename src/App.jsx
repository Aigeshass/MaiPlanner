import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import LoginPage from './components/Auth/LoginPage'
import StatisticsPage from './pages/StatisticsPage'
import ChatInterface from './components/ChatDemo/ChatInterface'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import SettingsPage from './pages/SettingsPage'
import HelpPage from './pages/HelpPage'
import './styles/App.css'
import './styles/PrivacyPolicy.css'
import './styles/Privacy.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#535bf2',
    },
  },
  typography: {
    fontFamily: '"system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 500,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
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
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/settings" element={
            <Box sx={{ display: 'flex', height: '100vh' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <SettingsPage />
              </Box>
            </Box>
          } />
          <Route path="/help" element={
            <Box sx={{ display: 'flex', height: '100vh' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <HelpPage />
              </Box>
            </Box>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
