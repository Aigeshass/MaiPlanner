import React, { useState } from 'react';
import { 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
  Button // Add missing Button import
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/calendarService';

const ProfileMenu = ({ isAuthenticated, userInfo = null }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Default user info if not provided
  const defaultUser = {
    name: 'Aigerim Kubanychbekova',
    email: 'aigerimk047@gmail.com',
    avatar: 'A'
  };
  
  const user = userInfo || defaultUser;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    handleClose();
    try {
      await logout();
      // Force refresh to ensure all auth state is cleared
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return (
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => navigate('/login')}
        sx={{ borderRadius: '6px' }}
      >
        Sign in
      </Button>
    );
  }
  
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          sx={{ 
            bgcolor: '#9c27b0',
            width: 36, 
            height: 36
          }}
        >
          {user.avatar}
        </Avatar>
      </IconButton>
      
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 230,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
            bgcolor: 'background.paper', // Ensure background is properly set
            color: 'text.primary' // Ensure text color is properly set
          }
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">{user.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
