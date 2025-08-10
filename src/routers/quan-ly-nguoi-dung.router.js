import express from 'express';
import { protect, adminOnly } from '../common/middlewares/protect.middleware.js';
import { validateLogin, validateRegister } from '../common/validators/auth.validator.js';
import { validateUser, validateUserUpdate } from '../common/validators/user.validator.js';
import { login, register, getUserInfo } from '../controllers/auth.controller.js';
import {
  getUsers,
  getUsersPaginated,
  searchUsers,
  searchUsersPaginated,
  getUserTypes,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: QuanLyNguoiDung
 *     description: Quản lý người dùng (legacy-compatible)
 */

/**
 * @swagger
 * /api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung:
 *   get:
 *     summary: Lấy danh sách loại người dùng
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách loại người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách loại người dùng thành công" }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       maLoaiNguoiDung: { type: string, example: "KhachHang" }
 *                       tenLoai: { type: string, example: "Khách hàng" }
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachLoaiNguoiDung', protect, adminOnly, getUserTypes);

/**
 * @swagger
 * /api/QuanLyNguoiDung/DangNhap:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [QuanLyNguoiDung]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [taiKhoan, matKhau]
 *             properties:
 *               taiKhoan:
 *                 type: string
 *                 example: "user123"
 *                 description: Tài khoản đăng nhập
 *               matKhau:
 *                 type: string
 *                 example: "password123"
 *                 description: Mật khẩu
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Đăng nhập thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
 *                     user: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Thông tin đăng nhập không đúng
 *       500:
 *         description: Lỗi server
 */
router.post('/DangNhap', validateLogin, login);

/**
 * @swagger
 * /api/QuanLyNguoiDung/DangKy:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [QuanLyNguoiDung]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [taiKhoan, matKhau, hoTen, email, soDT]
 *             properties:
 *               taiKhoan:
 *                 type: string
 *                 example: "user123"
 *                 description: Tài khoản
 *               matKhau:
 *                 type: string
 *                 example: "password123"
 *                 description: Mật khẩu
 *               hoTen:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *                 description: Họ tên
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: Email
 *               soDT:
 *                 type: string
 *                 example: "0123456789"
 *                 description: Số điện thoại
 *               loaiNguoiDung:
 *                 type: string
 *                 example: "KhachHang"
 *                 description: Loại người dùng
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Đăng ký thành công" }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tài khoản đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/DangKy', validateRegister, register);

/**
 * @swagger
 * /api/QuanLyNguoiDung/LayDanhSachNguoiDung:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách người dùng thành công" }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachNguoiDung', protect, adminOnly, getUsers);

/**
 * @swagger
 * /api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang:
 *   get:
 *     summary: Lấy danh sách người dùng phân trang
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 10 }
 *         description: Số lượng item mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng phân trang thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách người dùng phân trang thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     users: { type: array, items: { $ref: '#/components/schemas/User' } }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer, example: 1 }
 *                         limit: { type: integer, example: 10 }
 *                         total: { type: integer, example: 100 }
 *                         totalPages: { type: integer, example: 10 }
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachNguoiDungPhanTrang', protect, adminOnly, getUsersPaginated);

/**
 * @swagger
 * /api/QuanLyNguoiDung/TimKiemNguoiDung:
 *   get:
 *     summary: Tìm kiếm người dùng
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema: { type: string }
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Tìm kiếm người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Tìm kiếm người dùng thành công" }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Từ khóa tìm kiếm không được để trống
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get('/TimKiemNguoiDung', protect, adminOnly, searchUsers);

/**
 * @swagger
 * /api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang:
 *   get:
 *     summary: Tìm kiếm người dùng phân trang
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema: { type: string }
 *         description: Từ khóa tìm kiếm
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 10 }
 *         description: Số lượng item mỗi trang
 *     responses:
 *       200:
 *         description: Tìm kiếm người dùng phân trang thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Tìm kiếm người dùng phân trang thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     users: { type: array, items: { $ref: '#/components/schemas/User' } }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer, example: 1 }
 *                         limit: { type: integer, example: 10 }
 *                         total: { type: integer, example: 50 }
 *                         totalPages: { type: integer, example: 5 }
 *       400:
 *         description: Từ khóa tìm kiếm không được để trống
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.get('/TimKiemNguoiDungPhanTrang', protect, adminOnly, searchUsersPaginated);

/**
 * @swagger
 * /api/QuanLyNguoiDung/ThongTinTaiKhoan:
 *   post:
 *     summary: Lấy thông tin tài khoản hiện tại
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin tài khoản thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin tài khoản thành công" }
 *                 data: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy thông tin người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/ThongTinTaiKhoan', protect, getUserInfo);

/**
 * @swagger
 * /api/QuanLyNguoiDung/LayThongTinNguoiDung/{taiKhoan}:
 *   get:
 *     summary: Lấy thông tin người dùng theo tài khoản
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema: { type: string }
 *         description: Tài khoản người dùng
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin người dùng thành công" }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Tài khoản không được để trống
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinNguoiDung/:taiKhoan', protect, adminOnly, getUserById);

/**
 * @swagger
 * /api/QuanLyNguoiDung/ThemNguoiDung:
 *   post:
 *     summary: Thêm người dùng mới
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [taiKhoan, matKhau, hoTen, email, soDT]
 *             properties:
 *               taiKhoan:
 *                 type: string
 *                 example: "admin123"
 *                 description: Tài khoản
 *               matKhau:
 *                 type: string
 *                 example: "password123"
 *                 description: Mật khẩu
 *               hoTen:
 *                 type: string
 *                 example: "Admin User"
 *                 description: Họ tên
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@example.com"
 *                 description: Email
 *               soDT:
 *                 type: string
 *                 example: "0987654321"
 *                 description: Số điện thoại
 *               loaiNguoiDung:
 *                 type: string
 *                 example: "QuanTri"
 *                 description: Loại người dùng
 *     responses:
 *       201:
 *         description: Thêm người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Thêm người dùng thành công" }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tài khoản đã tồn tại
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.post('/ThemNguoiDung', protect, adminOnly, validateUser, createUser);

/**
 * @swagger
 * /api/QuanLyNguoiDung/CapNhatThongTinNguoiDung/{taiKhoan}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema: { type: string }
 *         description: Tài khoản người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hoTen:
 *                 type: string
 *                 example: "Nguyễn Văn B"
 *                 description: Họ tên mới
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "userb@example.com"
 *                 description: Email mới
 *               soDT:
 *                 type: string
 *                 example: "0123456789"
 *                 description: Số điện thoại mới
 *               loaiNguoiDung:
 *                 type: string
 *                 example: "KhachHang"
 *                 description: Loại người dùng mới
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Cập nhật thông tin người dùng thành công" }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.put('/CapNhatThongTinNguoiDung/:taiKhoan', protect, adminOnly, validateUserUpdate, updateUser);

// Compatibility endpoint (POST update)
router.post('/CapNhatThongTinNguoiDung', protect, adminOnly, (req, res, next) => {
  if (req.body && req.body.taiKhoan) {
    req.params.taiKhoan = req.body.taiKhoan;
  }
  next();
}, validateUserUpdate, updateUser);

/**
 * @swagger
 * /api/QuanLyNguoiDung/XoaNguoiDung/{taiKhoan}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [QuanLyNguoiDung]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema: { type: string }
 *         description: Tài khoản người dùng cần xóa
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Xóa người dùng thành công" }
 *                 data: { type: null, example: null }
 *       400:
 *         description: Tài khoản không được để trống
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.delete('/XoaNguoiDung/:taiKhoan', protect, adminOnly, deleteUser);

export default router;


