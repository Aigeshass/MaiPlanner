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
  IconButton
} from '@mui/material';
import { 
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  HelpOutline as HelpIcon,
  PushPin as PinIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const openedWidth = '25%';
const closedWidth = '60px';

const menuItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Calendar View', icon: <CalendarIcon /> },
  { text: 'Statistics', icon: <BarChartIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
  { text: 'Logout', icon: <LogoutIcon />, subtitle: 'After login' }
];

const Sidebar = () => {
  const [isPinned, setIsPinned] = useState(true);

  const toggleDrawer = () => {
    setIsPinned(!isPinned);
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
          justifyContent: 'space-between', 
          p: 2 
        }}
      >
        <Typography 
          onClick={!isPinned ? toggleDrawer : undefined}
          variant="h4" 
          sx={{
            fontSize: isPinned ? '2rem' : '1.5rem',
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '0.5px',
            backgroundImage: 'linear-gradient(90deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            textRendering: 'optimizeLegibility',
            marginRight: '8px',
            cursor: !isPinned ? 'pointer' : 'default',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {isPinned ? 'MaiPlanner' : 'MP'}
        </Typography>
        {isPinned && (
          <IconButton onClick={toggleDrawer}>
            <PinIcon sx={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        )}
        {!isPinned && (
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
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
                }}
              >
                {item.icon}
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
      <Box sx={{ p: 2, mt: 'auto', display: 'flex', justifyContent: isPinned ? 'flex-start' : 'center' }}>
        <ListItemButton
          sx={{
            borderRadius: '50%',
            width: 40,
            height: 40,
            minWidth: 'auto',
            justifyContent: 'center',
          }}
        >
          <HelpIcon fontSize="small" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
