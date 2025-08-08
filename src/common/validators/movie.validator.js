import Joi from 'joi';
import { errorResponse } from '../helpers/response.helper.js';

const validateMovie = (req, res, next) => {
  const schema = Joi.object({
    tenPhim: Joi.string().required().messages({
      'string.empty': 'Tên phim không được để trống',
      'any.required': 'Tên phim là bắt buộc'
    }),
    trailer: Joi.string().uri().required().messages({
      'string.uri': 'Trailer phải là URL hợp lệ',
      'string.empty': 'Trailer không được để trống',
      'any.required': 'Trailer là bắt buộc'
    }),
    moTa: Joi.string().required().messages({
      'string.empty': 'Mô tả không được để trống',
      'any.required': 'Mô tả là bắt buộc'
    }),
    ngayKhoiChieu: Joi.date().iso().required().messages({
      'date.base': 'Ngày khởi chiếu không hợp lệ',
      'any.required': 'Ngày khởi chiếu là bắt buộc'
    }),
    danhGia: Joi.number().integer().min(1).max(10).required().messages({
      'number.base': 'Đánh giá phải là số',
      'number.integer': 'Đánh giá phải là số nguyên',
      'number.min': 'Đánh giá phải từ 1-10',
      'number.max': 'Đánh giá phải từ 1-10',
      'any.required': 'Đánh giá là bắt buộc'
    }),
    hot: Joi.boolean().default(false),
    dangChieu: Joi.boolean().default(false),
    sapChieu: Joi.boolean().default(false)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

const validateMovieUpdate = (req, res, next) => {
  const schema = Joi.object({
    tenPhim: Joi.string().optional().messages({
      'string.empty': 'Tên phim không được để trống'
    }),
    trailer: Joi.string().uri().optional().messages({
      'string.uri': 'Trailer phải là URL hợp lệ',
      'string.empty': 'Trailer không được để trống'
    }),
    moTa: Joi.string().optional().messages({
      'string.empty': 'Mô tả không được để trống'
    }),
    ngayKhoiChieu: Joi.date().iso().optional().messages({
      'date.base': 'Ngày khởi chiếu không hợp lệ'
    }),
    danhGia: Joi.number().integer().min(1).max(10).optional().messages({
      'number.base': 'Đánh giá phải là số',
      'number.integer': 'Đánh giá phải là số nguyên',
      'number.min': 'Đánh giá phải từ 1-10',
      'number.max': 'Đánh giá phải từ 1-10'
    }),
    hot: Joi.boolean().optional(),
    dangChieu: Joi.boolean().optional(),
    sapChieu: Joi.boolean().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

export {
  validateMovie,
  validateMovieUpdate
};
