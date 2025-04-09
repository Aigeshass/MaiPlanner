import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton,
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpIcon,
  PushPin as PinIcon,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const openedWidth = '25%';
const closedWidth = '60px';

const menuItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Calendar View', icon: <CalendarIcon /> },
  { text: 'Statistics', icon: <BarChartIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> }
];

const Sidebar = () => {
  const [isPinned, setIsPinned] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsPinned(!isPinned);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // Define common icon styling to be used throughout the sidebar
  const iconStyle = {
    fontSize: '1.25rem', // Standardize icon size
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isPinned ? openedWidth : closedWidth,
        flexShrink: 0,
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: isPinned ? openedWidth : closedWidth,
          boxSizing: 'border-box',
          bgcolor: '#f8f9fa',
          borderRight: '1px solid #e0e0e0',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isPinned ? 'space-between' : 'center', 
          p: 2,
          pb: 3 // Add more padding at the bottom to move the divider down
        }}
      >
        {/* Logo - hide completely when closed */}
        {isPinned && (
          <Typography 
            variant="h4" 
            sx={{
              fontSize: '2rem',
              fontFamily: '"Quicksand", "Poppins", sans-serif',
              fontWeight: 700,
              letterSpacing: '0.5px',
              backgroundImage: 'linear-gradient(90deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              textRendering: 'optimizeLegibility',
              marginRight: '8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              borderRadius: '8px',
              padding: '2px 6px',
            }}
          >
            MaiPlanner
          </Typography>
        )}
        
        {/* Toggle button - different icons based on state */}
        <IconButton 
          onClick={toggleDrawer}
          sx={{
            ml: isPinned ? -1 : 0,
            position: !isPinned ? 'absolute' : 'static',
            left: !isPinned ? '50%' : 'auto',
            transform: !isPinned ? 'translateX(-50%)' : 'none',
            mt: !isPinned ? 1 : 0, // Move down slightly when in collapsed state
          }}
        >
          {isPinned ? (
            <PinIcon sx={{ ...iconStyle, transform: 'rotate(45deg)' }} />
          ) : (
            <MenuIcon sx={iconStyle} />
          )}
        </IconButton>
      </Box>
      {/* Standardized divider with consistent styling */}
      <Divider sx={{ 
        width: '100%', 
        borderColor: '#e0e0e0',
        my: 2 // Consistent margin, same as login page
      }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.text === 'Statistics') {
                  navigate('/statistics');
                } else if (item.text === 'Home') {
                  navigate('/');
                } else if (item.text === 'Settings') {
                  navigate('/settings');
                }
              }}
              sx={{
                borderRadius: '8px',
                mx: 1,
                mb: 0.5,
                minHeight: 48,
                justifyContent: isPinned ? 'initial' : 'center',
                px: 2.5,
                bgcolor: item.active ? 'primary.light' : 'transparent',
                '&:hover': {
                  bgcolor: item.active ? 'primary.light' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: item.active ? 'primary.main' : 'inherit',
                  minWidth: 0,
                  mr: isPinned ? 3 : 'auto',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px'
                }}>
                  {React.cloneElement(item.icon, { sx: iconStyle })}
                </Box>
              </ListItemIcon>
              {isPinned && (
                <ListItemText 
                  primary={item.text} 
                  secondary={item.subtitle}
                  primaryTypographyProps={{ 
                    fontWeight: item.active ? 'bold' : 'regular',
                    color: item.active ? 'primary.main' : 'inherit'
                  }}
                  sx={{ opacity: isPinned ? 1 : 0 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ 
        p: 2, 
        pl: 1,
        mt: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start' 
      }}>
        <ListItemButton
          sx={{
            borderRadius: '8px',
            mx: 1,
            ml: 0,
            mb: 0.5,
            minHeight: 48,
            justifyContent: isPinned ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: 0,
              mr: isPinned ? 3 : 'auto',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpIcon sx={{ fontSize: '1.25rem' }} />
            </Box>
          </ListItemIcon>
          {isPinned && (
            <ListItemText 
              primary="Help" 
              primaryTypographyProps={{ fontWeight: 'regular' }}
            />
          )}
        </ListItemButton>

        {isPinned && (
          <Box sx={{ mt: 2, width: '100%', px: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Legal
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="caption" 
                component="a" 
                onClick={() => navigateTo('/terms-of-service')}
                sx={{ cursor: 'pointer', mb: 0.5, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                Terms of Service
              </Typography>
              <Typography 
                variant="caption" 
                component="a" 
                onClick={() => navigateTo('/privacy-policy')}
                sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                Privacy Policy
              </Typography>
            </Box>
          </Box>
        )}

        {!isPinned && (
          <>
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ mt: 2, alignSelf: 'center' }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigateTo('/terms-of-service')}>Terms of Service</MenuItem>
              <MenuItem onClick={() => navigateTo('/privacy-policy')}>Privacy Policy</MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
