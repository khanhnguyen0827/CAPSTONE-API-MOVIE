import 'dotenv/config';

// Database Configuration
const DATABASE_CONFIG = {
  URL: process.env.DATABASE_URL,
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || 3306,
  NAME: process.env.DB_NAME || 'movie_ticketing',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || ''
};

// JWT Configuration
const JWT_CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'your-access-secret-key',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};

// Server Configuration
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};

// Rate Limiting Configuration
const RATE_LIMIT_CONFIG = {
  WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
};

// File Upload Configuration
const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads'
};

// Google OAuth Configuration
const GOOGLE_CONFIG = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/v1/auth/google/callback'
};

// Email Configuration
const EMAIL_CONFIG = {
  HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  PORT: parseInt(process.env.EMAIL_PORT) || 587,
  USER: process.env.EMAIL_USER,
  PASSWORD: process.env.EMAIL_PASSWORD,
  FROM: process.env.EMAIL_FROM || 'noreply@movieticketing.com'
};

// Pagination Configuration
const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// API Response Messages
const API_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công',
    REGISTER: 'Đăng ký thành công',
    LOGOUT: 'Đăng xuất thành công',
    CREATE: 'Tạo thành công',
    UPDATE: 'Cập nhật thành công',
    DELETE: 'Xóa thành công',
    FETCH: 'Lấy dữ liệu thành công'
  },
  ERROR: {
    UNAUTHORIZED: 'Không có quyền truy cập',
    FORBIDDEN: 'Truy cập bị từ chối',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    VALIDATION: 'Dữ liệu không hợp lệ',
    SERVER_ERROR: 'Lỗi server',
    DATABASE_ERROR: 'Lỗi cơ sở dữ liệu',
    FILE_UPLOAD_ERROR: 'Lỗi upload file',
    AUTHENTICATION_ERROR: 'Lỗi xác thực'
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// User Roles
const USER_ROLES = {
  ADMIN: 'QuanTri',
  CUSTOMER: 'KhachHang'
};

// Movie Status
const MOVIE_STATUS = {
  NOW_SHOWING: 'dangChieu',
  COMING_SOON: 'sapChieu',
  HOT: 'hot'
};

// Booking Status
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Seat Types
const SEAT_TYPES = {
  NORMAL: 'Thuong',
  VIP: 'Vip',
  COUPLE: 'Doi'
};

// Export all constants
export {
  DATABASE_CONFIG,
  JWT_CONFIG,
  SERVER_CONFIG,
  RATE_LIMIT_CONFIG,
  UPLOAD_CONFIG,
  GOOGLE_CONFIG,
  EMAIL_CONFIG,
  PAGINATION_CONFIG,
  API_MESSAGES,
  HTTP_STATUS,
  USER_ROLES,
  MOVIE_STATUS,
  BOOKING_STATUS,
  SEAT_TYPES
};
