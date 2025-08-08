import Joi from 'joi';
import { errorResponse } from '../helpers/response.helper.js';

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
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

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    taiKhoan: Joi.string().required().min(3).max(20).messages({
      'string.empty': 'Tài khoản không được để trống',
      'string.min': 'Tài khoản phải có ít nhất 3 ký tự',
      'string.max': 'Tài khoản không được quá 20 ký tự',
      'any.required': 'Tài khoản là bắt buộc'
    }),
    matKhau: Joi.string().required().min(6).messages({
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
      'any.required': 'Mật khẩu là bắt buộc'
    }),
    hoTen: Joi.string().required().messages({
      'string.empty': 'Họ tên không được để trống',
      'any.required': 'Họ tên là bắt buộc'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là bắt buộc'
    }),
    soDT: Joi.string().required().pattern(/^[0-9]{10,11}$/).messages({
      'string.empty': 'Số điện thoại không được để trống',
      'string.pattern.base': 'Số điện thoại không hợp lệ',
      'any.required': 'Số điện thoại là bắt buộc'
    }),
    loaiNguoiDung: Joi.string().valid('KhachHang', 'QuanTri').default('KhachHang').messages({
      'any.only': 'Loại người dùng không hợp lệ'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }
  next();
};

export {
  validateLogin,
  validateRegister
};
