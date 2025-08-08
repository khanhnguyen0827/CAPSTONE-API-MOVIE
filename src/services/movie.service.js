const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

class MovieService {
  async getAllMovies() {
    try {
      const movies = await prisma.phim.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách phim thành công',
        data: {
          movies: movies.map(movie => ({
            maPhim: movie.ma_phim,
            tenPhim: movie.ten_phim,
            trailer: movie.trailer,
            hinhAnh: movie.hinh_anh,
            moTa: movie.mo_ta,
            ngayKhoiChieu: movie.ngay_khoi_chieu,
            danhGia: movie.danh_gia,
            hot: movie.hot,
            dangChieu: movie.dang_chieu,
            sapChieu: movie.sap_chieu,
            createdAt: movie.created_at,
            updatedAt: movie.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Get all movies error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách phim',
        statusCode: 500
      };
    }
  }

  async getMoviesPaginated(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [movies, total] = await Promise.all([
        prisma.phim.findMany({
          skip,
          take: limit,
          orderBy: {
            created_at: 'desc'
          }
        }),
        prisma.phim.count()
      ]);

      return {
        success: true,
        message: 'Lấy danh sách phim phân trang thành công',
        data: {
          movies: movies.map(movie => ({
            maPhim: movie.ma_phim,
            tenPhim: movie.ten_phim,
            trailer: movie.trailer,
            hinhAnh: movie.hinh_anh,
            moTa: movie.mo_ta,
            ngayKhoiChieu: movie.ngay_khoi_chieu,
            danhGia: movie.danh_gia,
            hot: movie.hot,
            dangChieu: movie.dang_chieu,
            sapChieu: movie.sap_chieu,
            createdAt: movie.created_at,
            updatedAt: movie.updated_at
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
      console.error('Get movies paginated error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách phim phân trang',
        statusCode: 500
      };
    }
  }

  async getMoviesByDate(ngayKhoiChieu) {
    try {
      const movies = await prisma.phim.findMany({
        where: {
          ngay_khoi_chieu: {
            gte: new Date(ngayKhoiChieu),
            lt: new Date(new Date(ngayKhoiChieu).getTime() + 24 * 60 * 60 * 1000)
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách phim theo ngày thành công',
        data: {
          movies: movies.map(movie => ({
            maPhim: movie.ma_phim,
            tenPhim: movie.ten_phim,
            trailer: movie.trailer,
            hinhAnh: movie.hinh_anh,
            moTa: movie.mo_ta,
            ngayKhoiChieu: movie.ngay_khoi_chieu,
            danhGia: movie.danh_gia,
            hot: movie.hot,
            dangChieu: movie.dang_chieu,
            sapChieu: movie.sap_chieu,
            createdAt: movie.created_at,
            updatedAt: movie.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Get movies by date error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách phim theo ngày',
        statusCode: 500
      };
    }
  }

  async getMovieById(maPhim) {
    try {
      const movie = await prisma.phim.findFirst({
        where: {
          ma_phim: parseInt(maPhim)
        }
      });

      if (!movie) {
        return {
          success: false,
          message: 'Không tìm thấy phim',
          statusCode: 404
        };
      }

      return {
        success: true,
        message: 'Lấy thông tin phim thành công',
        data: {
          maPhim: movie.ma_phim,
          tenPhim: movie.ten_phim,
          trailer: movie.trailer,
          hinhAnh: movie.hinh_anh,
          moTa: movie.mo_ta,
          ngayKhoiChieu: movie.ngay_khoi_chieu,
          danhGia: movie.danh_gia,
          hot: movie.hot,
          dangChieu: movie.dang_chieu,
          sapChieu: movie.sap_chieu,
          createdAt: movie.created_at,
          updatedAt: movie.updated_at
        }
      };
    } catch (error) {
      console.error('Get movie by ID error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin phim',
        statusCode: 500
      };
    }
  }

  async getBanners() {
    try {
      const banners = await prisma.banner.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách banner thành công',
        data: {
          banners: banners.map(banner => ({
            maBanner: banner.ma_banner,
            maPhim: banner.ma_phim,
            hinhAnh: banner.hinh_anh,
            createdAt: banner.created_at,
            updatedAt: banner.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Get banners error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách banner',
        statusCode: 500
      };
    }
  }

  async createMovie(movieData, imageFile) {
    try {
      const {
        tenPhim,
        trailer,
        moTa,
        ngayKhoiChieu,
        danhGia,
        hot,
        dangChieu,
        sapChieu
      } = movieData;

      // Handle image upload
      let hinhAnh = null;
      if (imageFile) {
        const uploadDir = path.join(__dirname, '../../uploads/movies');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${imageFile.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        
        fs.writeFileSync(filePath, imageFile.buffer);
        hinhAnh = `/uploads/movies/${fileName}`;
      }

      // Create movie
      const newMovie = await prisma.phim.create({
        data: {
          ten_phim: tenPhim,
          trailer: trailer,
          hinh_anh: hinhAnh,
          mo_ta: moTa,
          ngay_khoi_chieu: new Date(ngayKhoiChieu),
          danh_gia: parseInt(danhGia),
          hot: hot === 'true' || hot === true,
          dang_chieu: dangChieu === 'true' || dangChieu === true,
          sap_chieu: sapChieu === 'true' || sapChieu === true
        }
      });

      return {
        success: true,
        message: 'Thêm phim thành công',
        data: {
          maPhim: newMovie.ma_phim,
          tenPhim: newMovie.ten_phim,
          trailer: newMovie.trailer,
          hinhAnh: newMovie.hinh_anh,
          moTa: newMovie.mo_ta,
          ngayKhoiChieu: newMovie.ngay_khoi_chieu,
          danhGia: newMovie.danh_gia,
          hot: newMovie.hot,
          dangChieu: newMovie.dang_chieu,
          sapChieu: newMovie.sap_chieu,
          createdAt: newMovie.created_at,
          updatedAt: newMovie.updated_at
        }
      };
    } catch (error) {
      console.error('Create movie error:', error);
      return {
        success: false,
        message: 'Lỗi thêm phim',
        statusCode: 500
      };
    }
  }

  async updateMovie(maPhim, movieData, imageFile) {
    try {
      const {
        tenPhim,
        trailer,
        moTa,
        ngayKhoiChieu,
        danhGia,
        hot,
        dangChieu,
        sapChieu
      } = movieData;

      // Check if movie exists
      const existingMovie = await prisma.phim.findFirst({
        where: {
          ma_phim: parseInt(maPhim)
        }
      });

      if (!existingMovie) {
        return {
          success: false,
          message: 'Không tìm thấy phim',
          statusCode: 404
        };
      }

      // Handle image upload
      let hinhAnh = existingMovie.hinh_anh;
      if (imageFile) {
        const uploadDir = path.join(__dirname, '../../uploads/movies');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${imageFile.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        
        fs.writeFileSync(filePath, imageFile.buffer);
        hinhAnh = `/uploads/movies/${fileName}`;

        // Delete old image if exists
        if (existingMovie.hinh_anh) {
          const oldImagePath = path.join(__dirname, '../..', existingMovie.hinh_anh);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }

      // Update movie
      const updatedMovie = await prisma.phim.update({
        where: {
          ma_phim: parseInt(maPhim)
        },
        data: {
          ten_phim: tenPhim,
          trailer: trailer,
          hinh_anh: hinhAnh,
          mo_ta: moTa,
          ngay_khoi_chieu: new Date(ngayKhoiChieu),
          danh_gia: parseInt(danhGia),
          hot: hot === 'true' || hot === true,
          dang_chieu: dangChieu === 'true' || dangChieu === true,
          sap_chieu: sapChieu === 'true' || sapChieu === true
        }
      });

      return {
        success: true,
        message: 'Cập nhật phim thành công',
        data: {
          maPhim: updatedMovie.ma_phim,
          tenPhim: updatedMovie.ten_phim,
          trailer: updatedMovie.trailer,
          hinhAnh: updatedMovie.hinh_anh,
          moTa: updatedMovie.mo_ta,
          ngayKhoiChieu: updatedMovie.ngay_khoi_chieu,
          danhGia: updatedMovie.danh_gia,
          hot: updatedMovie.hot,
          dangChieu: updatedMovie.dang_chieu,
          sapChieu: updatedMovie.sap_chieu,
          createdAt: updatedMovie.created_at,
          updatedAt: updatedMovie.updated_at
        }
      };
    } catch (error) {
      console.error('Update movie error:', error);
      return {
        success: false,
        message: 'Lỗi cập nhật phim',
        statusCode: 500
      };
    }
  }

  async uploadImage(imageFile) {
    try {
      if (!imageFile) {
        return {
          success: false,
          message: 'Không có file được upload',
          statusCode: 400
        };
      }

      const uploadDir = path.join(__dirname, '../../uploads/movies');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${imageFile.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      
      fs.writeFileSync(filePath, imageFile.buffer);

      return {
        success: true,
        message: 'Upload hình ảnh thành công',
        data: {
          url: `/uploads/movies/${fileName}`
        }
      };
    } catch (error) {
      console.error('Upload image error:', error);
      return {
        success: false,
        message: 'Lỗi upload hình ảnh',
        statusCode: 500
      };
    }
  }

  async deleteMovie(maPhim) {
    try {
      // Check if movie exists
      const existingMovie = await prisma.phim.findFirst({
        where: {
          ma_phim: parseInt(maPhim)
        }
      });

      if (!existingMovie) {
        return {
          success: false,
          message: 'Không tìm thấy phim',
          statusCode: 404
        };
      }

      // Delete associated image if exists
      if (existingMovie.hinh_anh) {
        const imagePath = path.join(__dirname, '../..', existingMovie.hinh_anh);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete movie
      await prisma.phim.delete({
        where: {
          ma_phim: parseInt(maPhim)
        }
      });

      return {
        success: true,
        message: 'Xóa phim thành công'
      };
    } catch (error) {
      console.error('Delete movie error:', error);
      return {
        success: false,
        message: 'Lỗi xóa phim',
        statusCode: 500
      };
    }
  }
}

module.exports = new MovieService();
