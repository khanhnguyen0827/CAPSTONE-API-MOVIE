const Joi = require('joi');
const { errorResponse } = require('../helpers/response.helper');
const { StatusCodes } = require('../helpers/status-code.helper');

// Validation schemas
const loginSchema = Joi.object({
  taiKhoan: Joi.string().required().messages({
    'string.empty': 'Tài khoản không được để trống',
    'any.required': 'Tài khoản là bắt buộc'
  }),
  matKhau: Joi.string().required().min(6).messages({
    'string.empty': 'Mật khẩu không được để trống',
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  })
});

const registerSchema = Joi.object({
  taiKhoan: Joi.string().required().messages({
    'string.empty': 'Tài khoản không được để trống',
    'any.required': 'Tài khoản là bắt buộc'
  }),
  matKhau: Joi.string().required().min(6).messages({
    'string.empty': 'Mật khẩu không được để trống',
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
    'any.required': 'Mật khẩu là bắt buộc'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'string.empty': 'Email không được để trống',
    'any.required': 'Email là bắt buộc'
  }),
  soDt: Joi.string().pattern(/^[0-9]{10,11}$/).required().messages({
    'string.pattern.base': 'Số điện thoại không hợp lệ',
    'string.empty': 'Số điện thoại không được để trống',
    'any.required': 'Số điện thoại là bắt buộc'
  })
});

const userSchema = Joi.object({
  taiKhoan: Joi.string().optional(),
  matKhau: Joi.string().min(6).optional().messages({
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'string.empty': 'Email không được để trống',
    'any.required': 'Email là bắt buộc'
  }),
  soDt: Joi.string().pattern(/^[0-9]{10,11}$/).required().messages({
    'string.pattern.base': 'Số điện thoại không hợp lệ',
    'string.empty': 'Số điện thoại không được để trống',
    'any.required': 'Số điện thoại là bắt buộc'
  }),
  hoTen: Joi.string().required().messages({
    'string.empty': 'Họ tên không được để trống',
    'any.required': 'Họ tên là bắt buộc'
  }),
  loaiNguoiDung: Joi.string().valid('KhachHang', 'QuanTri').optional()
});

const movieSchema = Joi.object({
  tenPhim: Joi.string().required().messages({
    'string.empty': 'Tên phim không được để trống',
    'any.required': 'Tên phim là bắt buộc'
  }),
  trailer: Joi.string().uri().optional().messages({
    'string.uri': 'Trailer phải là URL hợp lệ'
  }),
  moTa: Joi.string().optional(),
  ngayKhoiChieu: Joi.date().optional().messages({
    'date.base': 'Ngày khởi chiếu không hợp lệ'
  }),
  danhGia: Joi.number().min(0).max(10).optional().messages({
    'number.min': 'Đánh giá phải từ 0-10',
    'number.max': 'Đánh giá phải từ 0-10'
  }),
  hot: Joi.boolean().optional(),
  dangChieu: Joi.boolean().optional(),
  sapChieu: Joi.boolean().optional()
});

const bookingSchema = Joi.object({
  maLichChieu: Joi.number().integer().positive().required().messages({
    'number.base': 'Mã lịch chiếu phải là số',
    'number.integer': 'Mã lịch chiếu phải là số nguyên',
    'number.positive': 'Mã lịch chiếu phải là số dương',
    'any.required': 'Mã lịch chiếu là bắt buộc'
  }),
  danhSachVe: Joi.array().items(
    Joi.object({
      maGhe: Joi.number().integer().positive().required().messages({
        'number.base': 'Mã ghế phải là số',
        'number.integer': 'Mã ghế phải là số nguyên',
        'number.positive': 'Mã ghế phải là số dương',
        'any.required': 'Mã ghế là bắt buộc'
      }),
      giaVe: Joi.number().positive().required().messages({
        'number.base': 'Giá vé phải là số',
        'number.positive': 'Giá vé phải là số dương',
        'any.required': 'Giá vé là bắt buộc'
      })
    })
  ).min(1).required().messages({
    'array.min': 'Phải chọn ít nhất 1 ghế',
    'any.required': 'Danh sách vé là bắt buộc'
  })
});

const scheduleSchema = Joi.object({
  maPhim: Joi.number().integer().positive().required().messages({
    'number.base': 'Mã phim phải là số',
    'number.integer': 'Mã phim phải là số nguyên',
    'number.positive': 'Mã phim phải là số dương',
    'any.required': 'Mã phim là bắt buộc'
  }),
  ngayChieuGioChieu: Joi.date().required().messages({
    'date.base': 'Ngày giờ chiếu không hợp lệ',
    'any.required': 'Ngày giờ chiếu là bắt buộc'
  }),
  maRap: Joi.number().integer().positive().required().messages({
    'number.base': 'Mã rạp phải là số',
    'number.integer': 'Mã rạp phải là số nguyên',
    'number.positive': 'Mã rạp phải là số dương',
    'any.required': 'Mã rạp là bắt buộc'
  }),
  giaVe: Joi.number().positive().required().messages({
    'number.base': 'Giá vé phải là số',
    'number.positive': 'Giá vé phải là số dương',
    'any.required': 'Giá vé là bắt buộc'
  })
});

// Validation middleware functions
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

const validateMovie = (req, res, next) => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

const validateSchedule = (req, res, next) => {
  const { error } = scheduleSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, StatusCodes.BAD_REQUEST);
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
  validateUser,
  validateMovie,
  validateBooking,
  validateSchedule
};
