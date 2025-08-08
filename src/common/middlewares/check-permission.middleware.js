import { PrismaClient } from '@prisma/client';
import { forbiddenResponse } from '../helpers/response.helper.js';

const prisma = new PrismaClient();

/**
 * Permission Check Middleware
 * Checks if user has required permission for the action
 * @param {string} permission - Required permission (e.g., 'movie:create', 'booking:read')
 */
const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return forbiddenResponse(res, 'Yêu cầu đăng nhập');
      }

      // Admin has all permissions
      if (req.user.loai_nguoi_dung === 'QuanTri') {
        return next();
      }

      // For now, implement simple permission logic
      // In a real application, you would check against a permissions table
      const userPermissions = await getUserPermissions(req.user.tai_khoan);
      
      if (!userPermissions.includes(permission)) {
        return forbiddenResponse(res, 'Không có quyền thực hiện hành động này');
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      return forbiddenResponse(res, 'Lỗi kiểm tra quyền');
    }
  };
};

/**
 * Get user permissions from database
 * This is a simplified version - in real app, you'd have a permissions table
 */
const getUserPermissions = async (userId) => {
  try {
    // For now, return basic permissions for customers
    // In a real app, you'd query the permissions table
    return [
      'movie:read',
      'cinema:read',
      'booking:create',
      'booking:read',
      'booking:update',
      'booking:delete',
      'user:read',
      'user:update'
    ];
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return [];
  }
};

/**
 * Resource Owner Check Middleware
 * Checks if user owns the resource they're trying to access
 */
const checkResourceOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return forbiddenResponse(res, 'Yêu cầu đăng nhập');
      }

      // Admin can access all resources
      if (req.user.loai_nguoi_dung === 'QuanTri') {
        return next();
      }

      const resourceId = req.params.id || req.params.bookingId;
      
      if (!resourceId) {
        return forbiddenResponse(res, 'Thiếu ID tài nguyên');
      }

      let resource;
      
      switch (resourceType) {
        case 'booking':
          resource = await prisma.datVe.findFirst({
            where: {
              tai_khoan: req.user.tai_khoan,
              ma_lich_chieu: parseInt(resourceId)
            }
          });
          break;
          
        case 'user':
          resource = await prisma.nguoiDung.findUnique({
            where: { tai_khoan: parseInt(resourceId) }
          });
          break;
          
        default:
          return forbiddenResponse(res, 'Loại tài nguyên không hợp lệ');
      }

      if (!resource) {
        return forbiddenResponse(res, 'Không tìm thấy tài nguyên');
      }

      // Check if user owns the resource
      if (resource.tai_khoan && resource.tai_khoan !== req.user.tai_khoan) {
        return forbiddenResponse(res, 'Không có quyền truy cập tài nguyên này');
      }

      next();
    } catch (error) {
      console.error('Resource ownership check error:', error);
      return forbiddenResponse(res, 'Lỗi kiểm tra quyền sở hữu');
    }
  };
};

/**
 * Role-based Access Control Middleware
 * Checks if user has required role
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return forbiddenResponse(res, 'Yêu cầu đăng nhập');
    }

    const userRole = req.user.loai_nguoi_dung;
    
    if (!roles.includes(userRole)) {
      return forbiddenResponse(res, 'Không có quyền truy cập');
    }

    next();
  };
};

/**
 * Rate Limiting by User
 * Limits requests per user
 */
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next(); // Skip for unauthenticated users
    }

    const userId = req.user.tai_khoan;
    const now = Date.now();
    const userRequests = requests.get(userId) || [];

    // Remove old requests
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Quá nhiều yêu cầu, vui lòng thử lại sau'
      });
    }

    recentRequests.push(now);
    requests.set(userId, recentRequests);

    next();
  };
};

export {
  checkPermission,
  checkResourceOwnership,
  requireRole,
  userRateLimit
};