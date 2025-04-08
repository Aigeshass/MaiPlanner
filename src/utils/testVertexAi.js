// Load environment variables and required libraries
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleAuth } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from project root
config({ path: path.resolve(__dirname, '../../.env') });

// Configuration
const PROJECT_ID = process.env.VITE_PROJECT_ID || 'palm-api-456115';
const LOCATION = 'us-central1'; // Using us-central1 as it more likely has the model
const MODEL = 'text-bison@002'; // Adding version to model name
const SERVICE_ACCOUNT_PATH = '/Users/user/Desktop/vertex-IAM.json';

async function testVertexAi() {
  // Output config status
  console.log('Vertex AI Configuration:');
  console.log(`- Project ID: ${PROJECT_ID}`);
  console.log(`- Location: ${LOCATION}`);
  console.log(`- Model: ${MODEL}`);
  console.log(`- Service Account Key: ${fs.existsSync(SERVICE_ACCOUNT_PATH) ? '✓ Found' : '❌ Not found'}`);
  
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('❌ Service account key file not found at:', SERVICE_ACCOUNT_PATH);
    return false;
  }
  
  try {
    console.log('\nSetting up authentication...');
    // Initialize auth client with the service account key
    const auth = new GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    // Get the authenticated client
    const client = await auth.getClient();
    
    // Get the auth token
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;
    
    console.log('✓ Successfully obtained access token');
    
    console.log('\nTesting Vertex AI connection...');
    // Vertex AI endpoint (without API key)
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;
    
    console.log(`Sending authenticated request to: ${endpoint}`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [
          { prompt: "Say hello and introduce yourself as a calendar assistant." }
        ],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 256,
          topK: 40,
          topP: 0.95,
        }
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Vertex AI connection successful!');
      console.log('Response:');
      if (data.predictions && data.predictions.length > 0) {
        console.log(`"${data.predictions[0].content}"`);
      } else {
        console.log(JSON.stringify(data, null, 2));
      }
      return true;
    } else {
      console.error('\n❌ Vertex AI test failed!');
      console.error('Status:', response.status, response.statusText);
      console.error('Error details:', JSON.stringify(data.error || data, null, 2));
      
      // Provide troubleshooting based on common errors
      if (data.error?.code === 403) {
        console.error('\nPossible permission issues:');
        console.error('1. The service account may not have the required roles');
        console.error('2. Vertex AI API may not be enabled for your project');
        console.error('\nTo fix:');
        console.error('- Add "Vertex AI User" role to your service account');
        console.error('- Enable the Vertex AI API in Google Cloud Console');
      }
      
      if (data.error?.code === 404) {
        console.error('\nPossible resource issues:');
        console.error('1. The model name or version may be incorrect');
        console.error('2. The model may not be available in the selected region');
        console.error('\nTry these alternatives:');
        console.error('- Model: text-bison@002');
        console.error('- Model: gemini-1.0-pro');
        console.error('- Location: us-central1');
      }
      
      return false;
    }
  } catch (error) {
    console.error('\n❌ Connection error:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Run the test
testVertexAi().catch(console.error);
