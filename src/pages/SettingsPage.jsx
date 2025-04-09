import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider, 
  Switch, 
  FormControlLabel, 
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Alert,
  Snackbar
} from '@mui/material';

const SettingsPage = () => {
  // State for various settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [timeZone, setTimeZone] = useState('UTC');
  const [calendarView, setCalendarView] = useState('month');
  const [username, setUsername] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  // Handle save settings
  const handleSaveSettings = () => {
    // Here you would typically save settings to backend/localStorage
    console.log('Saving settings:', {
      darkMode,
      notifications,
      timeZone,
      calendarView,
      username
    });
    setShowSnackbar(true);
  };
  
  return (
    <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
          label="Dark Mode"
        />
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <FormControlLabel
          control={<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />}
          label="Enable Notifications"
        />
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Calendar Settings
        </Typography>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Default Calendar View</InputLabel>
            <Select
              value={calendarView}
              label="Default Calendar View"
              onChange={(e) => setCalendarView(e.target.value)}
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="agenda">Agenda</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Time Zone</InputLabel>
            <Select
              value={timeZone}
              label="Time Zone"
              onChange={(e) => setTimeZone(e.target.value)}
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
              <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
              <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
              <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
              <MenuItem value="Asia/Tokyo">Japan Standard Time (JST)</MenuItem>
              <MenuItem value="Europe/London">Greenwich Mean Time (GMT)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mt: 2 }}
        />
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </Box>
      </Paper>
      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
