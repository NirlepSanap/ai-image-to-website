# AI Image-to-Website Builder - Backend

A powerful Node.js backend service that converts UI design images into clean, responsive HTML or React code using Google's Gemini AI. This service provides user authentication, image processing, and code generation capabilities.

## 🚀 Features

- **AI-Powered Code Generation**: Convert UI mockups/designs into HTML or React components using Google Gemini Vision AI
- **User Authentication**: Secure JWT-based authentication with cookie support
- **Image Upload & Processing**: Handle multiple image formats (JPEG, PNG, GIF) with file validation
- **Code History**: Save and retrieve previously generated code snippets
- **Responsive Design**: Generated code includes responsive and accessible patterns
- **RESTful API**: Clean, well-documented API endpoints
- **Error Handling**: Comprehensive error handling and logging

## 🛠 Tech Stack

- **Runtime**: Node.js (≥18.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs for password hashing
- **AI Integration**: Google Generative AI (Gemini Vision)
- **File Upload**: Multer middleware
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)
- MongoDB database (local or cloud)
- Google Gemini API key

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-image-to-website
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=30d
   GEMINI_API_KEY=your-gemini-api-key-here
   FRONTEND_URL=http://localhost:3000
   ```

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 5000 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | No | 30d |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |
| `FRONTEND_URL` | Frontend application URL for CORS | No | http://localhost:3000 |

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Other Scripts
```bash
# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run fix

# Clean dependencies and reinstall
npm run reset
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Logout User
```http
POST /api/auth/logout
```

### Code Generation Endpoints

#### Generate Code from Image
```http
POST /api/code/generate
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- image: <image-file>
- outputType: html | react
```

#### Get Code History
```http
GET /api/code/history
Authorization: Bearer <token>
```

#### Get Specific Generated Code
```http
GET /api/code/:id
Authorization: Bearer <token>
```

### Health Check
```http
GET /api/health
```

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── db.js               # Database connection
│   ├── env.js              # Environment variables
│   └── jwt.js              # JWT utilities
├── controllers/            # Route controllers
│   ├── authController.js   # Authentication logic
│   ├── codeController.js   # Code generation logic
│   └── uploadController.js # File upload logic
├── middlewares/            # Custom middleware
│   ├── auth.js             # JWT authentication middleware
│   └── upload.js           # Multer upload middleware
├── models/                 # Database models
│   ├── GeneratedCode.js    # Generated code schema
│   └── User.js             # User schema
├── routes/                 # API routes
│   ├── authRoutes.js       # Authentication routes
│   └── codeRoutes.js       # Code generation routes
├── services/               # External services
│   └── geminiService.js    # Google Gemini AI integration
├── utils/                  # Utility functions
│   └── errorHandler.js     # Global error handler
├── uploads/                # Temporary file uploads (auto-created)
├── app.js                  # Express app configuration
├── server.js               # Server entry point
└── package.json            # Dependencies and scripts
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs with salt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks on authentication tokens
- **CORS Configuration**: Configurable cross-origin resource sharing
- **File Validation**: Strict image file type and size validation
- **Input Sanitization**: Request validation and sanitization

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Generated Code Model
```javascript
{
  user: ObjectId (ref: User, required),
  originalImage: String (required),
  htmlCode: String,
  cssCode: String,
  reactCode: String,
  outputType: String (enum: ['html', 'react'], required),
  createdAt: Date (default: now)
}
```

## 🔧 Development

### Code Style
This project uses ESLint with Airbnb configuration for consistent code formatting.

### Testing
Run tests with:
```bash
npm test
```

### Error Handling
The application includes comprehensive error handling for:
- Validation errors
- Authentication failures
- File upload issues
- Database connection problems
- External API failures

## 🚀 Deployment

1. **Environment Setup**: Ensure all production environment variables are set
2. **Database**: Set up MongoDB database (MongoDB Atlas recommended)
3. **API Keys**: Obtain and configure Google Gemini API key
4. **Process Manager**: Use PM2 or similar for production deployment
5. **Reverse Proxy**: Configure Nginx or Apache for production

### Example PM2 Configuration
```javascript
module.exports = {
  apps: [{
    name: 'ai-image-backend',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

## 🙏 Acknowledgments

- Google Gemini AI for powerful vision capabilities
- Express.js community for excellent documentation
- MongoDB team for robust database solutions

---

For questions or support, please open an issue or contact the maintainer.
