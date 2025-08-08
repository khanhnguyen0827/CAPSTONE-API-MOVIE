const bookingService = require('../services/booking.service');
const { successResponse, errorResponse } = require('../common/helpers/response.helper');

const getSeatList = async (req, res) => {
  try {
    const { maLichChieu } = req.query;

    if (!maLichChieu) {
      return errorResponse(res, 'Mã lịch chiếu không được để trống', 400);
    }

    const result = await bookingService.getSeatList(maLichChieu);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Get seat list controller error:', error);
    return errorResponse(res, 'Lỗi lấy danh sách ghế', 500);
  }
};

const bookTickets = async (req, res) => {
  try {
    const bookingData = req.body;
    const { taiKhoan } = req.user;

    // Add user info to booking data
    bookingData.taiKhoan = taiKhoan;

    const result = await bookingService.bookTickets(bookingData);

    if (result.success) {
      return successResponse(res, result.message, result.data);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Book tickets controller error:', error);
    return errorResponse(res, 'Lỗi đặt vé', 500);
  }
};

const createSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;

    const result = await bookingService.createSchedule(scheduleData);

    if (result.success) {
      return successResponse(res, result.message, result.data, 201);
    } else {
      return errorResponse(res, result.message, result.statusCode);
    }
  } catch (error) {
    console.error('Create schedule controller error:', error);
    return errorResponse(res, 'Lỗi tạo lịch chiếu', 500);
  }
};

module.exports = {
  getSeatList,
  bookTickets,
  createSchedule
};
