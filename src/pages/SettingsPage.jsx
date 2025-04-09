import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Switch, 
  FormControlLabel, 
  Select, 
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  ViewDay as ViewDayIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

const SettingsPage = () => {
  // State for various settings
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [defaultCalendarView, setDefaultCalendarView] = useState('month');
  const [language, setLanguage] = useState('en');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Handle settings changes
  const handleSaveSettings = () => {
    // In a real app, this would save settings to backend or local storage
    localStorage.setItem('settings', JSON.stringify({
      darkMode,
      notificationsEnabled,
      defaultCalendarView,
      language
    }));
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success'
    });
  };
  
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Customize your MaiPlanner experience
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={darkMode} 
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                }
                label="Dark Mode"
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Toggle between light and dark theme
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Calendar Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ViewDayIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Calendar</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="default-view-label">Default View</InputLabel>
                <Select
                  labelId="default-view-label"
                  value={defaultCalendarView}
                  label="Default View"
                  onChange={(e) => setDefaultCalendarView(e.target.value)}
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="week">Week</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="4days">4 Days</MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="body2" color="text.secondary">
                Choose which calendar view to show by default
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationsEnabled} 
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                }
                label="Enable Notifications"
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                Receive notifications for upcoming events
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Notification Time"
                  type="number"
                  defaultValue={30}
                  InputProps={{ inputProps: { min: 5, max: 120 } }}
                  disabled={!notificationsEnabled}
                  helperText="Minutes before event to notify"
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Language Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Language</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="ru">Русский</MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="body2" color="text.secondary">
                Choose your preferred language
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Account Settings */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Account</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Name" 
                    defaultValue="Aigerim Kubanychbekova" 
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Email" 
                    defaultValue="aigerimk047@gmail.com" 
                    variant="outlined" 
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" color="error">
                  Delete Account
                </Button>
                <Button variant="contained" color="primary">
                  Update Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button 
          variant="contained" 
          size="large" 
          color="primary"
          onClick={handleSaveSettings}
        >
          Save All Settings
        </Button>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({...snackbar, open: false})} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
