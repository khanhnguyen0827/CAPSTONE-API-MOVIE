/**
 * Centralized Error Handling Helper
 * Provides consistent error handling across the application
 */

/**
 * Global Error Handler Middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error values
  let statusCode = 500;
  let message = 'Lỗi server nội bộ';
  let errors = null;

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dữ liệu không hợp lệ';
    errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID không hợp lệ';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Dữ liệu đã tồn tại';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token không hợp lệ';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token đã hết hạn';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Không có quyền truy cập';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Truy cập bị từ chối';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Không tìm thấy tài nguyên';
  } else if (err.name === 'BadRequestError') {
    statusCode = 400;
    message = err.message || 'Yêu cầu không hợp lệ';
  } else if (err.name === 'ConflictError') {
    statusCode = 409;
    message = err.message || 'Xung đột dữ liệu';
  }

  // Send error response
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

/**
 * Custom Error Classes
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Yêu cầu không hợp lệ') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Không có quyền truy cập') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Truy cập bị từ chối') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy tài nguyên') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends AppError {
  constructor(message = 'Xung đột dữ liệu') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

class ValidationError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ', errors = null) {
    super(message, 400);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Async Error Handler
 * Wraps async functions to catch errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Database Error Handler
 * Handles database-specific errors
 */
const handleDatabaseError = (error) => {
  if (error.code === 'ER_DUP_ENTRY') {
    return new ConflictError('Dữ liệu đã tồn tại');
  }
  
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return new BadRequestError('Tham chiếu không hợp lệ');
  }
  
  if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    return new ConflictError('Không thể xóa do có dữ liệu liên quan');
  }
  
  return error;
};

/**
 * Validation Error Handler
 * Handles validation errors from express-validator
 */
const handleValidationError = (errors) => {
  const formattedErrors = errors.map(error => ({
    field: error.param,
    message: error.msg,
    value: error.value
  }));
  
  return new ValidationError('Dữ liệu không hợp lệ', formattedErrors);
};

export {
  errorHandler,
  asyncHandler,
  handleDatabaseError,
  handleValidationError,
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError
};