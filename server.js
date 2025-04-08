const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize OAuth2Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/auth/google/callback' // Must match exactly what's in Google Cloud
);

// Auth routes
app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
    prompt: 'consent'
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    // Store tokens in session
    req.session.tokens = tokens;
    // Redirect to frontend
    res.redirect('http://localhost:5173/calendar');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.redirect('http://localhost:5173/login?error=auth_failed');
  }
});

// Calendar API routes
app.get('/api/calendar/events', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/calendar/events', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    const event = await calendar.events.insert({
      calendarId: 'primary',
      resource: req.body,
    });
    
    res.json(event.data);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Status route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online',
    authenticated: !!req.session.tokens
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
