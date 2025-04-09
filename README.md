# MaiPlanner

MaiPlanner is an intelligent calendar and task management application with an integrated AI assistant that helps you efficiently plan and organize your schedule.

## Features

- **Dashboard**: Get an overview of your upcoming tasks and events
- **Calendar**: View and manage your schedule in a visual calendar interface
- **Statistics**: Track your productivity and task completion patterns
- **AI Assistant**: Get help with scheduling using a built-in demo chat interface
- **Settings**: Personalize the application to your preferences

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MaiPlanner-1.git
cd MaiPlanner-1
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:5173
```

## Using the AI Assistant

1. Navigate to the Chat section from the sidebar.
2. Type your scheduling request and press Enter or click the Send button.
3. The demo AI assistant will respond with scheduling suggestions and assistance.

Example queries:
- "Schedule a meeting with John on Friday at 2pm"
- "What events do I have tomorrow?"
- "Help me plan my work week"

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/utils` - Utility functions, including AI integration
  - `/styles` - CSS files

## Development

### Environment Variables

The application uses the following environment variables:

- `VITE_API_BASE_URL` - Base URL for API calls (default: http://localhost:8000)

Create a `.env.local` file in the root directory to override these values for local development.

## License

[MIT](LICENSE)