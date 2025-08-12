module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-image-to-website',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-here',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'your-api-key-here',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};