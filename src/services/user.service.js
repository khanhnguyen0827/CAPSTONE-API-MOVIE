import bcrypt from 'bcryptjs';
import prisma from '../common/prisma/init.prisma.js';

class UserService {
  async getAllUsers() {
    try {
      const users = await prisma.nguoiDung.findMany({
        select: {
          tai_khoan: true,
          ho_ten: true,
          email: true,
          so_dt: true,
          loai_nguoi_dung: true,
          created_at: true,
          updated_at: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách người dùng thành công',
        data: {
          users: users.map(user => ({
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            loaiNguoiDung: user.loai_nguoi_dung,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Get all users error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách người dùng',
        statusCode: 500
      };
    }
  }

  async getUsersPaginated(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [users, total] = await Promise.all([
        prisma.nguoiDung.findMany({
          skip,
          take: limit,
          select: {
            tai_khoan: true,
            ho_ten: true,
            email: true,
            so_dt: true,
            loai_nguoi_dung: true,
            created_at: true,
            updated_at: true
          },
          orderBy: {
            created_at: 'desc'
          }
        }),
        prisma.nguoiDung.count()
      ]);

      return {
        success: true,
        message: 'Lấy danh sách người dùng phân trang thành công',
        data: {
          users: users.map(user => ({
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            loaiNguoiDung: user.loai_nguoi_dung,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          })),
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
          }
        }
      };
    } catch (error) {
      console.error('Get users paginated error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách người dùng phân trang',
        statusCode: 500
      };
    }
  }

  async searchUsers(keyword) {
    try {
      const users = await prisma.nguoiDung.findMany({
        where: {
          OR: [
            { ho_ten: { contains: keyword } },
            { email: { contains: keyword } },
            { tai_khoan: { contains: keyword } }
          ]
        },
        select: {
          tai_khoan: true,
          ho_ten: true,
          email: true,
          so_dt: true,
          loai_nguoi_dung: true,
          created_at: true,
          updated_at: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Tìm kiếm người dùng thành công',
        data: {
          users: users.map(user => ({
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            loaiNguoiDung: user.loai_nguoi_dung,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Search users error:', error);
      return {
        success: false,
        message: 'Lỗi tìm kiếm người dùng',
        statusCode: 500
      };
    }
  }

  async searchUsersPaginated(keyword, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [users, total] = await Promise.all([
        prisma.nguoiDung.findMany({
          where: {
            OR: [
              { ho_ten: { contains: keyword } },
              { email: { contains: keyword } },
              { tai_khoan: { contains: keyword } }
            ]
          },
          skip,
          take: limit,
          select: {
            tai_khoan: true,
            ho_ten: true,
            email: true,
            so_dt: true,
            loai_nguoi_dung: true,
            created_at: true,
            updated_at: true
          },
          orderBy: {
            created_at: 'desc'
          }
        }),
        prisma.nguoiDung.count({
          where: {
            OR: [
              { ho_ten: { contains: keyword } },
              { email: { contains: keyword } },
              { tai_khoan: { contains: keyword } }
            ]
          }
        })
      ]);

      return {
        success: true,
        message: 'Tìm kiếm người dùng phân trang thành công',
        data: {
          users: users.map(user => ({
            taiKhoan: user.tai_khoan,
            hoTen: user.ho_ten,
            email: user.email,
            soDT: user.so_dt,
            loaiNguoiDung: user.loai_nguoi_dung,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          })),
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
          }
        }
      };
    } catch (error) {
      console.error('Search users paginated error:', error);
      return {
        success: false,
        message: 'Lỗi tìm kiếm người dùng phân trang',
        statusCode: 500
      };
    }
  }

  async getUserTypes() {
    try {
      const userTypes = await prisma.nguoiDung.groupBy({
        by: ['loai_nguoi_dung'],
        _count: {
          loai_nguoi_dung: true
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách loại người dùng thành công',
        data: {
          userTypes: userTypes.map(type => ({
            loaiNguoiDung: type.loai_nguoi_dung,
            count: type._count.loai_nguoi_dung
          }))
        }
      };
    } catch (error) {
      console.error('Get user types error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách loại người dùng',
        statusCode: 500
      };
    }
  }

  async getUserById(taiKhoan) {
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
          message: 'Không tìm thấy người dùng',
          statusCode: 404
        };
      }

      return {
        success: true,
        message: 'Lấy thông tin người dùng thành công',
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
      console.error('Get user by ID error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin người dùng',
        statusCode: 500
      };
    }
  }

  async createUser(userData) {
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

      return {
        success: true,
        message: 'Thêm người dùng thành công',
        data: {
          taiKhoan: newUser.tai_khoan,
          hoTen: newUser.ho_ten,
          email: newUser.email,
          soDT: newUser.so_dt,
          loaiNguoiDung: newUser.loai_nguoi_dung,
          createdAt: newUser.created_at,
          updatedAt: newUser.updated_at
        }
      };
    } catch (error) {
      console.error('Create user error:', error);
      return {
        success: false,
        message: 'Lỗi thêm người dùng',
        statusCode: 500
      };
    }
  }

  async updateUser(taiKhoan, userData) {
    try {
      const { hoTen, email, soDT, loaiNguoiDung } = userData;

      // Check if user exists
      const existingUser = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        }
      });

      if (!existingUser) {
        return {
          success: false,
          message: 'Không tìm thấy người dùng',
          statusCode: 404
        };
      }

      // Update user
      const updatedUser = await prisma.nguoiDung.update({
        where: {
          tai_khoan: taiKhoan
        },
        data: {
          ho_ten: hoTen,
          email: email,
          so_dt: soDT,
          loai_nguoi_dung: loaiNguoiDung
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

      return {
        success: true,
        message: 'Cập nhật thông tin người dùng thành công',
        data: {
          taiKhoan: updatedUser.tai_khoan,
          hoTen: updatedUser.ho_ten,
          email: updatedUser.email,
          soDT: updatedUser.so_dt,
          loaiNguoiDung: updatedUser.loai_nguoi_dung,
          createdAt: updatedUser.created_at,
          updatedAt: updatedUser.updated_at
        }
      };
    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        message: 'Lỗi cập nhật thông tin người dùng',
        statusCode: 500
      };
    }
  }

  async deleteUser(taiKhoan) {
    try {
      // Check if user exists
      const existingUser = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        }
      });

      if (!existingUser) {
        return {
          success: false,
          message: 'Không tìm thấy người dùng',
          statusCode: 404
        };
      }

      // Delete user
      await prisma.nguoiDung.delete({
        where: {
          tai_khoan: taiKhoan
        }
      });

      return {
        success: true,
        message: 'Xóa người dùng thành công'
      };
    } catch (error) {
      console.error('Delete user error:', error);
      return {
        success: false,
        message: 'Lỗi xóa người dùng',
        statusCode: 500
      };
    }
  }
}

export default new UserService();
