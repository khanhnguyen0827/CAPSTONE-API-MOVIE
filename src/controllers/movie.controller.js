import movieService from '../services/movie.service.js';
import { successResponse, errorResponse } from '../common/helpers/response.helper.js';

const getMovies = async (req, res) => {
  try {
    const result = await movieService.getAllMovies();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get movies controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách phim', 500);
  }
};

const getMoviesPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await movieService.getMoviesPaginated(parseInt(page), parseInt(limit));

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get movies paginated controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách phim phân trang', 500);
  }
};

const getMoviesByDate = async (req, res) => {
  try {
    const { ngayKhoiChieu } = req.query;

    if (!ngayKhoiChieu) {
      return errorResponse(res, 'Ngày khởi chiếu không được để trống', 400);
    }

    const result = await movieService.getMoviesByDate(ngayKhoiChieu);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get movies by date controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách phim theo ngày', 500);
  }
};

const getMovieById = async (req, res) => {
  try {
    const maPhim = req.query?.maPhim || req.params?.maPhim || req.body?.maPhim;

    if (!maPhim) {
      return errorResponse(res, 'Mã phim không được để trống', 400);
    }

    const result = await movieService.getMovieById(maPhim);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get movie by ID controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin phim', 500);
  }
};

const getBanners = async (req, res) => {
  try {
    const result = await movieService.getBanners();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get banners controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách banner', 500);
  }
};

const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const imageFile = req.file;

    const result = await movieService.createMovie(movieData, imageFile);

    if (result.success) {
      return successResponse(res, result.message, result.data, 201);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Create movie controller error:', error);
    return errorResponse(res, 'Lỗi thêm phim', 500);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { maPhim, ...movieData } = req.body;
    const imageFile = req.file;

    const result = await movieService.updateMovie(maPhim, movieData, imageFile);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Update movie controller error:', error);
    return errorResponse(res, 'Lỗi cập nhật phim', 500);
  }
};

const uploadImage = async (req, res) => {
  try {
    const imageFile = req.file;

    const result = await movieService.uploadImage(imageFile);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Upload image controller error:', error);
    return errorResponse(res, 'Lỗi upload hình ảnh', 500);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const maPhim = req.query?.maPhim || req.params?.maPhim || req.body?.maPhim;

    const result = await movieService.deleteMovie(maPhim);

    if (result.success) {
      return successResponse(res, result.message);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Delete movie controller error:', error);
    return errorResponse(res, 'Lỗi xóa phim', 500);
  }
};

export {
  getMovies,
  getMoviesPaginated,
  getMoviesByDate,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage
};
