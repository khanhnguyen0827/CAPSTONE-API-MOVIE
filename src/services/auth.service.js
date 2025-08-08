const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse, unauthorizedResponse } = require('../common/helpers/response.helper');

const prisma = new PrismaClient();

class AuthService {
  async login(taiKhoan, matKhau) {
    try {
      // Find user by taiKhoan
      const user = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'Tài khoản không tồn tại',
          statusCode: 401
        };
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(matKhau, user.mat_khau);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Mật khẩu không đúng',
          statusCode: 401
        };
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          taiKhoan: user.tai_khoan,
          loaiNguoiDung: user.loai_nguoi_dung
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          accessToken: token,
          user: {
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            loaiNguoiDung: user.loai_nguoi_dung
          }
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Lỗi đăng nhập',
        statusCode: 500
      };
    }
  }

  async register(userData) {
    try {
      const { taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung } = userData;

      // Check if user already exists
      const existingUser = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        }
      });

      if (existingUser) {
        return {
          success: false,
          message: 'Tài khoản đã tồn tại',
          statusCode: 400
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(matKhau, 10);

      // Create new user
      const newUser = await prisma.nguoiDung.create({
        data: {
          tai_khoan: taiKhoan,
          mat_khau: hashedPassword,
          ho_ten: hoTen,
          email: email,
          so_dt: soDT,
          loai_nguoi_dung: loaiNguoiDung || 'KhachHang'
        }
      });

      return {
        success: true,
        message: 'Đăng ký thành công',
        data: {
          taiKhoan: newUser.tai_khoan,
          hoTen: newUser.ho_ten,
          email: newUser.email,
          soDT: newUser.so_dt,
          loaiNguoiDung: newUser.loai_nguoi_dung
        }
      };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Lỗi đăng ký',
        statusCode: 500
      };
    }
  }

  async getUserInfo(taiKhoan) {
    try {
      const user = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        },
        select: {
          tai_khoan: true,
          ho_ten: true,
          email: true,
          so_dt: true,
          loai_nguoi_dung: true,
          created_at: true,
          updated_at: true
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'Không tìm thấy thông tin người dùng',
          statusCode: 404
        };
      }

      return {
        success: true,
        message: 'Lấy thông tin thành công',
        data: {
          taiKhoan: user.tai_khoan,
          hoTen: user.ho_ten,
          email: user.email,
          soDT: user.so_dt,
          loaiNguoiDung: user.loai_nguoi_dung,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };
    } catch (error) {
      console.error('Get user info error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin người dùng',
        statusCode: 500
      };
    }
  }
}

module.exports = new AuthService();
