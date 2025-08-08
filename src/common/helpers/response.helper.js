/**
 * Standardized API Response Helper
 * Provides consistent response format across the application
 */

/**
 * Success Response
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const successResponse = (res, data = null, message = 'Thành công', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Error Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Array} errors - Validation errors array
 */
const errorResponse = (res, message = 'Lỗi server', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Pagination Response
 * @param {Object} res - Express response object
 * @param {Array} data - Response data array
 * @param {Object} pagination - Pagination info
 * @param {string} message - Success message
 */
const paginationResponse = (res, data, pagination, message = 'Thành công') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString()
  });
};

/**
 * Created Response
 * @param {Object} res - Express response object
 * @param {Object} data - Created resource data
 * @param {string} message - Success message
 */
const createdResponse = (res, data, message = 'Tạo thành công') => {
  return successResponse(res, data, message, 201);
};

/**
 * No Content Response
 * @param {Object} res - Express response object
 */
const noContentResponse = (res) => {
  return res.status(204).send();
};

/**
 * Bad Request Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Array} errors - Validation errors
 */
const badRequestResponse = (res, message = 'Dữ liệu không hợp lệ', errors = null) => {
  return errorResponse(res, message, 400, errors);
};

/**
 * Unauthorized Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const unauthorizedResponse = (res, message = 'Không có quyền truy cập') => {
  return errorResponse(res, message, 401);
};

/**
 * Forbidden Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const forbiddenResponse = (res, message = 'Truy cập bị từ chối') => {
  return errorResponse(res, message, 403);
};

/**
 * Not Found Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const notFoundResponse = (res, message = 'Không tìm thấy') => {
  return errorResponse(res, message, 404);
};

/**
 * Conflict Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const conflictResponse = (res, message = 'Dữ liệu đã tồn tại') => {
  return errorResponse(res, message, 409);
};

/**
 * Validation Error Response
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors array
 */
const validationErrorResponse = (res, errors) => {
  return badRequestResponse(res, 'Dữ liệu không hợp lệ', errors);
};

export {
  successResponse,
  errorResponse,
  paginationResponse,
  createdResponse,
  noContentResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  validationErrorResponse
};


