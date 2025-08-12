/**
 * Custom error handler for Express applications
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Validation Error';
    errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  } else if (err.name === 'CastError') {
    // Mongoose cast error (invalid ObjectId, etc.)
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value: ${field}. Please use another value.`;
  } else if (err.name === 'JsonWebTokenError') {
    // JWT error
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expired error
    statusCode = 401;
    message = 'Your token has expired. Please log in again.';
  }

  // Determine if we're in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Prepare error response
  const errorResponse = {
    status: 'error',
    message,
    ...(isDevelopment && { stack: err.stack }),
    ...(errors && { errors }),
  };

  // Send error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;