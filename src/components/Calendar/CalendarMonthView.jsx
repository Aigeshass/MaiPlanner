import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Add missing import
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  Today as TodayIcon
} from '@mui/icons-material';
import { checkAuthStatus } from '../../utils/calendarService';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import CalendarYearView from './CalendarYearView';
import Calendar4DayView from './Calendar4DayView';

// Sample calendar events
const sampleEvents = [
  {
    id: 1,
    title: 'High Table Dinner',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (5 - new Date().getDay()) % 7, 18, 30), // Next Friday
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (5 - new Date().getDay()) % 7, 21, 0),
    color: '#4285F4', // Google Calendar blue
    type: 'social'
  },
  {
    id: 2,
    title: 'Assignment 2 Due',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (4 - new Date().getDay()) % 7 + 7, 23, 59), // Next Thursday
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (4 - new Date().getDay()) % 7 + 7, 23, 59),
    color: '#D50000', // Google Calendar red
    type: 'academic'
  },
  {
    id: 3,
    title: 'Tutorial Deadline',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (0 - new Date().getDay()) % 7, 23, 59), // This Sunday
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (0 - new Date().getDay()) % 7, 23, 59),
    color: '#D50000', // Google Calendar red
    type: 'academic'
  },
  {
    id: 4,
    title: 'Gym Session',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 18, 0), // Tomorrow evening
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 19, 30),
    color: '#0B8043', // Google Calendar green
    type: 'fitness'
  },
  {
    id: 5,
    title: 'Gym Session',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 18, 0), // 3 days from now
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 19, 30),
    color: '#0B8043', // Google Calendar green
    type: 'fitness'
  },
  {
    id: 6,
    title: 'Gym Session',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, 18, 0), // 5 days from now
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5, 19, 30),
    color: '#0B8043', // Google Calendar green
    type: 'fitness'
  },
  {
    id: 7,
    title: 'Judo Competition',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()) % 7, 9, 0), // This Saturday
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()) % 7, 15, 0),
    color: '#F6BF26', // Google Calendar yellow
    type: 'sport'
  },
  {
    id: 8,
    title: 'Russian Lesson',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (2 - new Date().getDay()) % 7, 17, 0), // This Tuesday
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (2 - new Date().getDay()) % 7, 18, 30),
    color: '#8E24AA', // Google Calendar purple
    type: 'education'
  }
];

// Helper function to get days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// Helper function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const CalendarMonthView = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Add this line
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewType, setViewType] = useState('month');

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
      // Only show events if authenticated
      setEvents(authStatus ? sampleEvents : []);
    };
    
    checkAuth();
  }, []);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Menu handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle view type change
  const handleViewChange = (type) => {
    setViewType(type);
    handleMenuClose();
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    const days = [];
    const today = new Date();

    // Add previous month's days if needed
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();
      
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentMonth &&
        event.date.getFullYear() === currentYear
      );

      days.push({ 
        day, 
        isCurrentMonth: true, 
        isToday, 
        date,
        events: dayEvents
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarGrid();
  
  // Format month and year for display
  const monthYearDisplay = new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date(currentYear, currentMonth));
  
  // Days of week
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Render the appropriate view
  const renderCalendarView = () => {
    switch (viewType) {
      case 'day':
        return <CalendarDayView events={events} date={new Date(currentYear, currentMonth, currentDate.getDate())} />;
      case 'week':
        return <CalendarWeekView events={events} date={new Date(currentYear, currentMonth, currentDate.getDate())} />;
      case '4days':
        return <Calendar4DayView events={events} date={new Date(currentYear, currentMonth, currentDate.getDate())} />;
      case 'year':
        return <CalendarYearView events={events} year={currentYear} />;
      case 'month':
      default:
        return (
          <Paper elevation={2} sx={{ overflow: 'hidden' }}>
            {/* Weekday headers */}
            <Grid container sx={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
              {weekdays.map((day, index) => (
                <Grid 
                  item 
                  xs={12/7} 
                  key={day} 
                  sx={{ 
                    py: 1, 
                    textAlign: 'center',
                    borderRight: index < 6 ? '1px solid #e0e0e0' : 'none',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 'medium'
                  }}
                >
                  {day}
                </Grid>
              ))}
            </Grid>
            
            {/* Calendar days */}
            <Grid container sx={{ minHeight: '70vh' }}>
              {calendarDays.map((dayData, index) => (
                <Grid 
                  item 
                  xs={12/7} 
                  key={index}
                  sx={{ 
                    height: '100px', 
                    borderRight: (index + 1) % 7 !== 0 ? '1px solid #e0e0e0' : 'none',
                    borderBottom: '1px solid #e0e0e0',
                    bgcolor: dayData.isToday ? 'rgba(66, 133, 244, 0.1)' : 'white',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: dayData.isCurrentMonth ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                    }
                  }}
                >
                  {dayData.isCurrentMonth && (
                    <Box sx={{ p: 0.5 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          textAlign: 'center',
                          fontWeight: dayData.isToday ? 'bold' : 'normal',
                          color: dayData.isToday ? 'primary.main' : 'text.primary',
                          mb: 0.5
                        }}
                      >
                        {dayData.day}
                      </Typography>
                      
                      {/* Events */}
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.5, 
                        maxHeight: '75px',
                        overflow: 'hidden'
                      }}>
                        {dayData.events?.map(event => (
                          <Tooltip
                            key={event.id}
                            title={`${event.title} - ${event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                            placement="top"
                          >
                            <Box
                              sx={{
                                backgroundColor: event.color,
                                color: 'white', // Ensuring text is white for contrast
                                fontSize: '11px',
                                p: '2px 4px',
                                borderRadius: '4px',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                '&:hover': {
                                  filter: 'brightness(0.9)'
                                }
                              }}
                            >
                              {event.title}
                            </Box>
                          </Tooltip>
                        ))}
                        {dayData.events?.length > 2 && !isMobile && (
                          <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.secondary' }}>
                            +{dayData.events.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        );
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, height: '100%', overflow: 'auto' }}>
      {/* Calendar Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
          <Typography variant="h5" component="h1" sx={{ mr: 2 }}>
            {monthYearDisplay}
          </Typography>
          <IconButton onClick={handleToday} sx={{ mr: 1 }} aria-label="Today">
            <TodayIcon />
          </IconButton>
          <IconButton onClick={handlePrevMonth} aria-label="Previous month">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth} aria-label="Next month">
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
        <IconButton onClick={handleMenuOpen} aria-label="More options">
          <MoreVertIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleViewChange('day')}>Day</MenuItem>
          <MenuItem onClick={() => handleViewChange('week')}>Week</MenuItem>
          <MenuItem onClick={() => handleViewChange('month')}>Month</MenuItem>
          <MenuItem onClick={() => handleViewChange('year')}>Year</MenuItem>
          <MenuItem onClick={() => handleViewChange('schedule')}>Schedule</MenuItem>
          <MenuItem onClick={() => handleViewChange('4days')}>4 Days</MenuItem>
        </Menu>
      </Box>
      
      {/* Calendar Content */}
      {!isAuthenticated && (
        <Box sx={{ textAlign: 'center', py: 5, bgcolor: 'white' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sign in to view your calendar events
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Sign in with Google
          </Button>
        </Box>
      )}
      
      {isAuthenticated && renderCalendarView()}
    </Box>
  );
};

export default CalendarMonthView;
