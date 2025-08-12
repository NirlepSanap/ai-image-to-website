const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', db: 'connected' });
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});