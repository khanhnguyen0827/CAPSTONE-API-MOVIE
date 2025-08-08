const express = require('express');
const { 
  getSeatList, 
  bookTickets, 
  createSchedule 
} = require('../controllers/booking.controller');
const { validateBooking, validateSchedule } = require('../common/validators/booking.validator');
const { protect, adminOnly } = require('../common/middlewares/protect.middleware');

const router = express.Router();

/**
 * @swagger
 * /bookings/lay-danh-sach-ghe/{maLichChieu}:
 *   get:
 *     summary: Lấy danh sách ghế theo lịch chiếu
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: maLichChieu
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Mã lịch chiếu
 *     responses:
 *       200:
 *         description: Lấy danh sách ghế thành công
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
 *                   example: Lấy danh sách ghế thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     thongTinPhim:
 *                       type: object
 *                       properties:
 *                         maPhim:
 *                           type: integer
 *                           example: 1
 *                         tenPhim:
 *                           type: string
 *                           example: 'Avengers: Endgame'
 *                         hinhAnh:
 *                           type: string
 *                           example: 'avengers.jpg'
 *                         ngayChieu:
 *                           type: string
 *                           format: date-time
 *                           example: '2024-01-15T14:00:00Z'
 *                         gioChieu:
 *                           type: string
 *                           format: date-time
 *                           example: '2024-01-15T14:00:00Z'
 *                         giaVe:
 *                           type: number
 *                           example: 75000
 *                     danhSachGhe:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Seat'
 *       404:
 *         description: Không tìm thấy lịch chiếu
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
router.get('/lay-danh-sach-ghe/:maLichChieu', getSeatList);

/**
 * @swagger
 * /bookings/dat-ve:
 *   post:
 *     summary: Đặt vé xem phim
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequest'
 *     responses:
 *       200:
 *         description: Đặt vé thành công
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
 *                   example: Đặt vé thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     maLichChieu:
 *                       type: integer
 *                       example: 1
 *                     danhSachVe:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maGhe:
 *                             type: integer
 *                             example: 1
 *                           giaVe:
 *                             type: number
 *                             example: 75000
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc ghế đã được đặt
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
 *         description: Không tìm thấy lịch chiếu hoặc người dùng
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
router.post('/dat-ve', protect, validateBooking, bookTickets);

/**
 * @swagger
 * /bookings/tao-lich-chieu:
 *   post:
 *     summary: Tạo lịch chiếu mới (Chỉ admin)
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - maRap
 *               - maPhim
 *               - ngayGioChieu
 *               - giaVe
 *             properties:
 *               maRap:
 *                 type: integer
 *                 example: 1
 *                 description: Mã rạp phim
 *               maPhim:
 *                 type: integer
 *                 example: 1
 *                 description: Mã phim
 *               ngayGioChieu:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-01-15T14:00:00Z'
 *                 description: Ngày giờ chiếu
 *               giaVe:
 *                 type: number
 *                 example: 75000
 *                 description: Giá vé
 *     responses:
 *       201:
 *         description: Tạo lịch chiếu thành công
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
 *                   example: Tạo lịch chiếu thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     maLichChieu:
 *                       type: integer
 *                       example: 1
 *                     maRap:
 *                       type: integer
 *                       example: 1
 *                     maPhim:
 *                       type: integer
 *                       example: 1
 *                     ngayGioChieu:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-01-15T14:00:00Z'
 *                     giaVe:
 *                       type: number
 *                       example: 75000
 *                     phim:
 *                       $ref: '#/components/schemas/Movie'
 *                     rapPhim:
 *                       $ref: '#/components/schemas/Theater'
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc lịch chiếu đã tồn tại
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
 *         description: Không tìm thấy rạp phim hoặc phim
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
router.post('/tao-lich-chieu', protect, adminOnly, validateSchedule, createSchedule);

module.exports = router;
