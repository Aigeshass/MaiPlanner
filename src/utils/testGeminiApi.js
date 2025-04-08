import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from project root
config({ path: path.resolve(__dirname, '../../.env') });

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function testGeminiApi() {
  console.log('Testing Gemini API connection...');
  console.log(`API key exists: ${!!API_KEY}`);
  
  if (!API_KEY) {
    console.error('❌ VITE_GEMINI_API_KEY not found in .env file');
    return false;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Hello! Please introduce yourself as a calendar assistant." }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Gemini API connection successful!');
      console.log('Response:');
      console.log(data.candidates[0].content.parts[0].text);
      return true;
    } else {
      console.error('\n❌ Gemini API test failed!');
      console.error('Status:', response.status, response.statusText);
      console.error('Error details:', JSON.stringify(data.error || data, null, 2));
      return false;
    }
  } catch (error) {
    console.error('\n❌ Connection error:', error.message);
    return false;
  }
}

// Run the test
testGeminiApi().catch(console.error);
