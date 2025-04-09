import fetch from 'node-fetch';

async function testOllamaConnection() {
  console.log('Testing connection to Ollama...');

  try {
    // List available models
    const modelsResponse = await fetch('http://localhost:11434/api/tags');
    if (!modelsResponse.ok) {
      throw new Error(`Failed to connect: ${modelsResponse.status} ${modelsResponse.statusText}`);
    }

    const models = await modelsResponse.json();
    console.log('✅ Successfully connected to Ollama');
    console.log('Available models:', models.models?.map((m) => m.name).join(', ') || 'No models available');

    // Check if llama3 model is available
    const hasLlama3 = models.models?.some((model) => model.name.includes('llama3') || model.name.includes('llama:3'));
    if (!hasLlama3) {
      console.log('❌ Llama3 model not found.');
      return false;
    }

    console.log('✅ Llama3 model is available');

    // Test a simple query
    const generateResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: 'Say hello in one short sentence',
        stream: false,
      }),
    });

    if (!generateResponse.ok) {
      throw new Error(`Failed to generate: ${generateResponse.status}`);
    }

    const result = await generateResponse.json();
    console.log('Model response:', result.response);
    return true;
  } catch (error) {
    console.error('❌ Ollama connection error:', error.message);
    return false;
  }
}

testOllamaConnection().then((result) => {
  if (!result) {
    console.log('\nTroubleshooting steps:');
    console.log('1. Ensure Ollama is running with: ollama serve');
    console.log('2. If not installed, install with: brew install ollama');
    console.log('3. Pull the model with: ollama pull llama3:8b');
  }
});
