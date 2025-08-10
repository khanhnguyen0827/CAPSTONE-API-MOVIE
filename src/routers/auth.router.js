import express from 'express';
import { validateLogin, validateRegister } from '../common/validators/auth.validator.js';
import { login, register, getUserInfo } from '../controllers/auth.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Xác thực và đăng nhập
 */

/**
 * @swagger
 * /api/v1/auth/dang-nhap:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
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
router.post('/dang-nhap', validateLogin, login);

/**
 * @swagger
 * /api/v1/auth/dang-ky:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
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
router.post('/dang-ky', validateRegister, register);

/**
 * @swagger
 * /api/v1/auth/thong-tin-tai-khoan:
 *   post:
 *     summary: Lấy thông tin tài khoản hiện tại
 *     tags: [Auth]
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
router.post('/thong-tin-tai-khoan', protect, getUserInfo);

// RESTful route aliases for testing compatibility
router.post('/login', validateLogin, login); // POST /api/v1/auth/login
router.post('/register', validateRegister, register); // POST /api/v1/auth/register
router.get('/me', protect, getUserInfo); // GET /api/v1/auth/me

export default router;
