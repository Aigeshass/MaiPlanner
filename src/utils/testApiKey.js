// Load environment variables from .env file
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from project root
config({ path: path.resolve(__dirname, '../../.env') });

// Get API key from environment variables
const API_KEY = process.env.VITE_GOOGLE_API_KEY;

async function testApiKey() {
  // Output API key status (masked for security)
  console.log(`API key loaded: ${API_KEY ? '✓ Yes' : '❌ No'}`);
  if (API_KEY) {
    console.log(`Key begins with: ${API_KEY.substring(0, 4)}...`);
  }
  
  try {
    // Test the API key by listing available models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models?key=${API_KEY}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API key is working correctly!');
      console.log('Available models:');
      data.models.forEach(model => {
        console.log(`- ${model.name}`);
      });
      return true;
    } else {
      console.error('❌ API key test failed:', data.error?.message || 'Unknown error');
      console.error('Error details:', JSON.stringify(data.error, null, 2));
      return false;
    }
  } catch (error) {
    console.error('❌ API connection error:', error.message);
    return false;
  }
}

// Run the test
testApiKey();
