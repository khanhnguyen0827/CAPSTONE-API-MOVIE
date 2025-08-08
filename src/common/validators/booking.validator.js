import Joi from 'joi';
import { errorResponse } from '../helpers/response.helper.js';

const validateBooking = (req, res, next) => {
  const schema = Joi.object({
    maLichChieu: Joi.number().integer().required().messages({
      'number.base': 'Mã lịch chiếu phải là số',
      'number.integer': 'Mã lịch chiếu phải là số nguyên',
      'any.required': 'Mã lịch chiếu là bắt buộc'
    }),
    danhSachVe: Joi.array().items(
      Joi.object({
        maGhe: Joi.number().integer().required().messages({
          'number.base': 'Mã ghế phải là số',
          'number.integer': 'Mã ghế phải là số nguyên',
          'any.required': 'Mã ghế là bắt buộc'
        }),
        giaVe: Joi.number().positive().required().messages({
          'number.base': 'Giá vé phải là số',
          'number.positive': 'Giá vé phải lớn hơn 0',
          'any.required': 'Giá vé là bắt buộc'
        })
      })
    ).min(1).required().messages({
      'array.min': 'Phải chọn ít nhất 1 vé',
      'any.required': 'Danh sách vé là bắt buộc'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

const validateSchedule = (req, res, next) => {
  const schema = Joi.object({
    maRap: Joi.number().integer().required().messages({
      'number.base': 'Mã rạp phải là số',
      'number.integer': 'Mã rạp phải là số nguyên',
      'any.required': 'Mã rạp là bắt buộc'
    }),
    maPhim: Joi.number().integer().required().messages({
      'number.base': 'Mã phim phải là số',
      'number.integer': 'Mã phim phải là số nguyên',
      'any.required': 'Mã phim là bắt buộc'
    }),
    ngayGioChieu: Joi.date().iso().required().messages({
      'date.base': 'Ngày giờ chiếu không hợp lệ',
      'any.required': 'Ngày giờ chiếu là bắt buộc'
    }),
    giaVe: Joi.number().positive().required().messages({
      'number.base': 'Giá vé phải là số',
      'number.positive': 'Giá vé phải lớn hơn 0',
      'any.required': 'Giá vé là bắt buộc'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

export {
  validateBooking,
  validateSchedule
};
