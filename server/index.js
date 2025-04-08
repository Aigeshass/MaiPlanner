import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Load client secrets from downloaded JSON file
const credentials = JSON.parse(
  fs.readFileSync('/Users/user/Desktop/client_secret_calendapps.googleusercontent.com.json')
);

const clientSecret = credentials.web.client_secret;
const clientId = credentials.web.client_id;
const redirectUri = credentials.web.redirect_uris[0]; // Use the first redirect URI from your file

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true
}));

// Session setup for storing tokens temporarily
app.use(session({
  secret: 'your_session_secret', // Change this to a random string in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Routes
app.get('/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'profile',
    'email'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Get refresh token
    scope: scopes,
    prompt: 'consent' // Force to get refresh token on each auth
  });

  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange auth code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Save tokens in session
    req.session.tokens = tokens;
    
    // Redirect back to frontend
    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

// Endpoint to get user's calendar events
app.get('/api/calendar/events', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).send('Not authenticated');
  }
  
  try {
    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    if (error.code === 401) {
      return res.status(401).send('Token expired');
    }
    res.status(500).send('Error fetching calendar data');
  }
});

// Endpoint to create a calendar event
app.post('/api/calendar/events', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).send('Not authenticated');
  }
  
  try {
    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const event = req.body;
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).send('Error creating event');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
