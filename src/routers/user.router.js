const express = require('express');
const { 
  getUsers, 
  getUsersPaginated, 
  searchUsers, 
  searchUsersPaginated, 
  getUserTypes, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/user.controller');
const { validateUser, validateUserUpdate } = require('../common/validators/user.validator');
const { protect, adminOnly } = require('../common/middlewares/protect.middleware');

const router = express.Router();

/**
 * @swagger
 * /users/lay-danh-sach-nguoi-dung:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Chỉ admin)
 *     tags: [Users]
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-nguoi-dung', protect, adminOnly, getUsers);

/**
 * @swagger
 * /users/lay-danh-sach-nguoi-dung-phan-trang:
 *   get:
 *     summary: Lấy danh sách người dùng phân trang (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Số lượng người dùng mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng phân trang thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách người dùng phân trang thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalItems:
 *                           type: integer
 *                           example: 50
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 10
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-nguoi-dung-phan-trang', protect, adminOnly, getUsersPaginated);

/**
 * @swagger
 * /users/tim-kiem-nguoi-dung:
 *   get:
 *     summary: Tìm kiếm người dùng (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *           example: 'nguyen'
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Tìm kiếm người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tìm kiếm người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/tim-kiem-nguoi-dung', protect, adminOnly, searchUsers);

/**
 * @swagger
 * /users/tim-kiem-nguoi-dung-phan-trang:
 *   get:
 *     summary: Tìm kiếm người dùng phân trang (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *           example: 'nguyen'
 *         description: Từ khóa tìm kiếm
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Số lượng người dùng mỗi trang
 *     responses:
 *       200:
 *         description: Tìm kiếm người dùng phân trang thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Tìm kiếm người dùng phân trang thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalItems:
 *                           type: integer
 *                           example: 50
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 10
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/tim-kiem-nguoi-dung-phan-trang', protect, adminOnly, searchUsersPaginated);

/**
 * @swagger
 * /users/lay-danh-sach-loai-nguoi-dung:
 *   get:
 *     summary: Lấy danh sách loại người dùng (Chỉ admin)
 *     tags: [Users]
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách loại người dùng thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     userTypes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           loaiNguoiDung:
 *                             type: string
 *                             example: 'KhachHang'
 *                           count:
 *                             type: integer
 *                             example: 100
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-loai-nguoi-dung', protect, adminOnly, getUserTypes);

/**
 * @swagger
 * /users/lay-thong-tin-nguoi-dung/{taiKhoan}:
 *   get:
 *     summary: Lấy thông tin người dùng theo tài khoản (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema:
 *           type: string
 *           example: 'user123'
 *         description: Tài khoản người dùng
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy thông tin người dùng thành công
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-thong-tin-nguoi-dung/:taiKhoan', protect, adminOnly, getUserById);

/**
 * @swagger
 * /users/them-nguoi-dung:
 *   post:
 *     summary: Thêm người dùng mới (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Thêm người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Thêm người dùng thành công
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tài khoản đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/them-nguoi-dung', protect, adminOnly, validateUser, createUser);

/**
 * @swagger
 * /users/cap-nhat-nguoi-dung/{taiKhoan}:
 *   put:
 *     summary: Cập nhật thông tin người dùng (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema:
 *           type: string
 *           example: 'user123'
 *         description: Tài khoản người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hoTen:
 *                 type: string
 *                 example: 'Nguyễn Văn A'
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'user@example.com'
 *               soDT:
 *                 type: string
 *                 example: '0123456789'
 *               loaiNguoiDung:
 *                 type: string
 *                 enum: ['KhachHang', 'QuanTri']
 *                 example: 'KhachHang'
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cập nhật thông tin người dùng thành công
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/cap-nhat-nguoi-dung/:taiKhoan', protect, adminOnly, validateUserUpdate, updateUser);

/**
 * @swagger
 * /users/xoa-nguoi-dung/{taiKhoan}:
 *   delete:
 *     summary: Xóa người dùng (Chỉ admin)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taiKhoan
 *         required: true
 *         schema:
 *           type: string
 *           example: 'user123'
 *         description: Tài khoản người dùng
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Xóa người dùng thành công
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/xoa-nguoi-dung/:taiKhoan', protect, adminOnly, deleteUser);

module.exports = router;
