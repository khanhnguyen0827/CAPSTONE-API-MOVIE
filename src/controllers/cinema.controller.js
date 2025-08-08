const cinemaService = require('../services/cinema.service');
const { successResponse, errorResponse } = require('../common/helpers/response.helper');

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

    const result = await cinemaService.getCinemaClusters(maHeThongRap);

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

    const result = await cinemaService.getCinemaSchedules(maHeThongRap);

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

    const result = await cinemaService.getMovieSchedules(maPhim);

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

module.exports = {
  getCinemaSystems,
  getCinemaClusters,
  getCinemaSchedules,
  getMovieSchedules
};
