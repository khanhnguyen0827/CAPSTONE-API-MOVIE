import express from 'express';
import {
  getSeatList,
  bookTickets,
  createSchedule
} from '../controllers/booking.controller.js';
import { validateBooking, validateSchedule } from '../common/validators/booking.validator.js';
import { protect, adminOnly } from '../common/middlewares/protect.middleware.js';
import { validateCybersoftToken } from '../common/middlewares/cybersoft-token.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: QuanLyDatVe
 *     description: Quản lý đặt vé (legacy-compatible)
 */

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
 *         schema: { type: integer, example: 1 }
 *         description: Mã lịch chiếu
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng vé thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách phòng vé thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     thongTinPhim:
 *                       type: object
 *                       properties:
 *                         maPhim: { type: integer, example: 1 }
 *                         tenPhim: { type: string, example: "Avengers: Endgame" }
 *                         hinhAnh: { type: string, example: "avengers.jpg" }
 *                         ngayChieu: { type: string, example: "2024-01-15" }
 *                         gioChieu: { type: string, example: "14:00" }
 *                         tenRap: { type: string, example: "Rạp 1" }
 *                         tenCumRap: { type: string, example: "BHD Star Bitexco" }
 *                         tenHeThongRap: { type: string, example: "BHD Star Cineplex" }
 *                     danhSachGhe:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maGhe: { type: integer, example: 1 }
 *                           tenGhe: { type: string, example: "A1" }
 *                           loaiGhe: { type: string, example: "Vip" }
 *                           giaGhe: { type: number, example: 75000 }
 *                           trangThai: { type: string, example: "Trống" }
 *       400:
 *         description: Mã lịch chiếu không được để trống
 *       404:
 *         description: Không tìm thấy lịch chiếu
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachPhongVe', protect, getSeatList);

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
 *         application/json:
 *           schema:
 *             type: object
 *             required: [maLichChieu, danhSachGhe]
 *             properties:
 *               maLichChieu:
 *                 type: integer
 *                 example: 1
 *                 description: Mã lịch chiếu
 *               danhSachGhe:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [maGhe]
 *                   properties:
 *                     maGhe:
 *                       type: integer
 *                       example: 1
 *                       description: Mã ghế
 *                     giaGhe:
 *                       type: number
 *                       example: 75000
 *                       description: Giá ghế
 *               taiKhoanNguoiDung:
 *                 type: string
 *                 example: "user123"
 *                 description: Tài khoản người dùng đặt vé
 *     responses:
 *       200:
 *         description: Đặt vé thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Đặt vé thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     maDatVe: { type: integer, example: 1 }
 *                     maLichChieu: { type: integer, example: 1 }
 *                     maGhe: { type: integer, example: 1 }
 *                     taiKhoanNguoiDung: { type: string, example: "user123" }
 *                     ngayDat: { type: string, format: date-time, example: "2024-01-15T14:00:00Z" }
 *                     giaVe: { type: number, example: 75000 }
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc ghế đã được đặt
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy lịch chiếu hoặc người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/DatVe', protect, validateCybersoftToken, validateBooking, bookTickets);

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
 *             required: [maRap, maPhim, ngayGioChieu, giaVe]
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
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Tạo lịch chiếu thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     maLichChieu: { type: integer, example: 1 }
 *                     maRap: { type: integer, example: 1 }
 *                     maPhim: { type: integer, example: 1 }
 *                     ngayGioChieu: { type: string, format: date-time, example: "2024-01-15T14:00:00Z" }
 *                     giaVe: { type: number, example: 75000 }
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc lịch chiếu đã tồn tại
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy rạp phim hoặc phim
 *       500:
 *         description: Lỗi server
 */
router.post('/TaoLichChieu', protect, adminOnly, validateSchedule, createSchedule);

// RESTful route aliases for testing compatibility
router.get('/seats', getSeatList); // GET /api/v1/bookings/seats
router.post('/tickets', protect, validateCybersoftToken, validateBooking, bookTickets); // POST /api/v1/bookings/tickets
router.post('/schedules', protect, adminOnly, validateSchedule, createSchedule); // POST /api/v1/bookings/schedules

export default router;
