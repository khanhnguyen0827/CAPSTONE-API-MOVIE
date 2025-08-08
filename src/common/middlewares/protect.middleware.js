const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { unauthorizedResponse } = require('../helpers/response.helper');

const prisma = new PrismaClient();

/**
 * Authentication Middleware
 * Verifies JWT token and adds user to request object
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return unauthorizedResponse(res, 'Không có token xác thực');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await prisma.nguoiDung.findUnique({
      where: { tai_khoan: decoded.taiKhoan },
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        loai_nguoi_dung: true,
        so_dt: true
      }
    });

    if (!user) {
      return unauthorizedResponse(res, 'Token không hợp lệ');
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return unauthorizedResponse(res, 'Token không hợp lệ');
    }
    
    if (error.name === 'TokenExpiredError') {
      return unauthorizedResponse(res, 'Token đã hết hạn');
    }

    return unauthorizedResponse(res, 'Lỗi xác thực');
  }
};

/**
 * Optional Authentication Middleware
 * Similar to protect but doesn't require token
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await prisma.nguoiDung.findUnique({
        where: { tai_khoan: decoded.taiKhoan },
        select: {
          tai_khoan: true,
          ho_ten: true,
          email: true,
          loai_nguoi_dung: true,
          so_dt: true
        }
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

/**
 * Admin Only Middleware
 * Checks if user is admin
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Yêu cầu đăng nhập');
  }

  if (req.user.loai_nguoi_dung !== 'QuanTri') {
    return unauthorizedResponse(res, 'Không có quyền truy cập');
  }

  next();
};

/**
 * User Only Middleware
 * Checks if user is authenticated (not admin)
 */
const userOnly = (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Yêu cầu đăng nhập');
  }

  if (req.user.loai_nguoi_dung === 'QuanTri') {
    return unauthorizedResponse(res, 'Chỉ dành cho khách hàng');
  }

  next();
};

/**
 * Permission Check Middleware
 * Checks if user has specific permission
 */
const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Yêu cầu đăng nhập');
    }

    // For now, only admin users have all permissions
    if (req.user.loai_nguoi_dung === 'QuanTri') {
      return next();
    }

    // Check specific permissions for regular users
    const userPermissions = {
      'user:read': true,
      'user:update': req.user.tai_khoan === parseInt(req.params.id || req.body.taiKhoan),
      'booking:create': true,
      'booking:read': true
    };

    if (userPermissions[permission]) {
      return next();
    }

    return unauthorizedResponse(res, 'Không có quyền thực hiện hành động này');
  };
};

module.exports = {
  protect,
  optionalAuth,
  adminOnly,
  userOnly,
  checkPermission
};