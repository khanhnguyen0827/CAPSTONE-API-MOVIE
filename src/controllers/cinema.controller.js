import cinemaService from '../services/cinema.service.js';
import { successResponse, errorResponse } from '../common/helpers/response.helper.js';

const getCinemaSystems = async (req, res) => {
  try {
    const result = await cinemaService.getCinemaSystems();

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get cinema systems controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin hệ thống rạp', 500);
  }
};

const getCinemaClusters = async (req, res) => {
  try {
    const { maHeThongRap } = req.query;

    if (!maHeThongRap) {
      return errorResponse(res, 'Mã hệ thống rạp không được để trống', 400);
    }

    // Convert string to integer for database query
    const maHeThongRapInt = parseInt(maHeThongRap, 10);
    if (isNaN(maHeThongRapInt)) {
      return errorResponse(res, 'Mã hệ thống rạp không hợp lệ', 400);
    }

    const result = await cinemaService.getCinemaClusters(maHeThongRapInt);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get cinema clusters controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin cụm rạp', 500);
  }
};

const getCinemaSchedules = async (req, res) => {
  try {
    const { maHeThongRap } = req.query;

    if (!maHeThongRap) {
      return errorResponse(res, 'Mã hệ thống rạp không được để trống', 400);
    }

    // Convert string to integer for database query
    const maHeThongRapInt = parseInt(maHeThongRap, 10);
    if (isNaN(maHeThongRapInt)) {
      return errorResponse(res, 'Mã hệ thống rạp không hợp lệ', 400);
    }

    const result = await cinemaService.getCinemaSchedules(maHeThongRapInt);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get cinema schedules controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin lịch chiếu hệ thống rạp', 500);
  }
};

const getMovieSchedules = async (req, res) => {
  try {
    const { maPhim } = req.query;

    if (!maPhim) {
      return errorResponse(res, 'Mã phim không được để trống', 400);
    }

    // Convert string to integer for database query
    const maPhimInt = parseInt(maPhim, 10);
    if (isNaN(maPhimInt)) {
      return errorResponse(res, 'Mã phim không hợp lệ', 400);
    }

    const result = await cinemaService.getMovieSchedules(maPhimInt);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get movie schedules controller error:', error);
    return errorResponse(res, 'Lỗi lấy thông tin lịch chiếu phim', 500);
  }
};

export {
  getCinemaSystems,
  getCinemaClusters,
  getCinemaSchedules,
  getMovieSchedules
};
