import { GoogleGenerativeAI } from '@google/generative-ai';

export async function analyzeImage(image: File) {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please check your .env file.');
    }

    console.log('Starting image analysis...');
    console.log('Image type:', image.type);
    console.log('Image size:', image.size);

    // Convert the image to base64
    const bytes = await image.arrayBuffer();
    const base64Image = btoa(
      new Uint8Array(bytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    console.log('Image converted to base64, length:', base64Image.length);

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    // Create a prompt for image analysis
    const prompt = `You are an expert analyst who is adding details from an image. Based on this image you need to generate a well informative description with all the details. Add some contextual attributes:
1. Platform - Is this image from Web or Mobile platform based on layout
2. Which financial product this image is referring, any sub product being referred
Add top 3 tags or keywords which would be associated with this image for better classification.
Format the response as valid JSON with the following structure:
{
  "description": "detailed description",
  "platform": "web or mobile",
  "product": "main financial product",
  "subproduct": "specific financial product or feature",
  "tags": "comma-separated keywords"
}`;

    console.log('Sending request to Gemini API...');

    // Generate content with the image
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image
        }
      }
    ]);

    console.log('Received response from Gemini API');

    const response = await result.response;
    const text = response.text();
    
    console.log('Raw response:', text);
    
    try {
      // Try to parse the response as JSON
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      const jsonStr = text.slice(jsonStart, jsonEnd);
      const parsedData = JSON.parse(jsonStr);
      
      console.log('Parsed response:', parsedData);
      return parsedData;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      console.error('Raw text that failed to parse:', text);
      return {
        description: text,
        platform: '',
        product: '',
        subproduct: '',
        tags: '',
      };
    }
  } catch (error) {
    console.error('Error in analyze-image:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
} 