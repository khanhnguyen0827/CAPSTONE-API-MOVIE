import express from 'express';
import {
  getSeatList,
  bookTickets,
  createSchedule
} from '../controllers/booking.controller.js';
import { validateBooking, validateSchedule } from '../common/validators/booking.validator.js';
import { protect, adminOnly } from '../common/middlewares/protect.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/QuanLyDatVe/LayDanhSachPhongVe:
 *   get:
 *     summary: Lấy danh sách phòng vé theo lịch chiếu
 *     tags: [QuanLyDatVe]
 *     parameters:
 *       - in: query
 *         name: maLichChieu
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Mã lịch chiếu
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng vé thành công
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
 *                   example: Lấy danh sách phòng vé thành công
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
 *       400:
 *         description: Mã lịch chiếu không được để trống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
router.get('/LayDanhSachPhongVe', getSeatList);

/**
 * @swagger
 * /api/QuanLyDatVe/DatVe:
 *   post:
 *     summary: Đặt vé xem phim
 *     tags: [QuanLyDatVe]
 *     security:
 *       - BearerAuth: []
 *       - TokenCybersoft: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json-patch+json:
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
router.post('/DatVe', protect, validateBooking, bookTickets);

/**
 * @swagger
 * /api/QuanLyDatVe/TaoLichChieu:
 *   post:
 *     summary: Tạo lịch chiếu mới (Chỉ admin)
 *     tags: [QuanLyDatVe]
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
router.post('/TaoLichChieu', protect, adminOnly, validateSchedule, createSchedule);

export default router;
