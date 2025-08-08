import authService from '../services/auth.service.js';
import { successResponse, errorResponse } from '../common/helpers/response.helper.js';

const login = async (req, res) => {
  try {
    const { taiKhoan, matKhau } = req.body;

    const result = await authService.login(taiKhoan, matKhau);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Login controller error:', error);
    return errorResponse(res, 'Lỗi đăng nhập', 500);
  }
};

const register = async (req, res) => {
  try {
    const userData = req.body;

    const result = await authService.register(userData);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Register controller error:', error);
    return errorResponse(res, 'Lỗi đăng ký', 500);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { taiKhoan } = req.user;

    const result = await authService.getUserInfo(taiKhoan);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get user info controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin người dùng', 500);
  }
};

export {
  login,
  register,
  getUserInfo
};
