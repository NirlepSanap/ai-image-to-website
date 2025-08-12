const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Convert image file to generative part
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
}

// Generate code from image
async function generateCodeFromImage(imagePath, outputType) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const prompt = `
      Analyze this UI design image and generate clean, professional ${outputType} code.
      For ${outputType === 'html' ? 'HTML with CSS' : 'React components with Tailwind CSS'}.
      Include all necessary elements with proper styling.
      Make the code responsive and accessible.
      Return only the code with no additional explanations or markdown formatting.
    `;

    const imagePart = fileToGenerativePart(imagePath, 'image/png');
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const code = response.text();

    return code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw new Error('Failed to generate code from image');
  }
}

module.exports = { generateCodeFromImage };