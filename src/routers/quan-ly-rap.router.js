import express from 'express';
import {
  getCinemaSystems,
  getCinemaClusters,
  getCinemaSchedules,
  getMovieSchedules
} from '../controllers/cinema.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: QuanLyRap
 *     description: Quản lý rạp phim (legacy-compatible)
 */

/**
 * @swagger
 * /api/QuanLyRap/LayThongTinHeThongRap:
 *   get:
 *     summary: Lấy thông tin hệ thống rạp
 *     tags: [QuanLyRap]
 *     responses:
 *       200:
 *         description: Lấy thông tin hệ thống rạp thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin hệ thống rạp thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     heThongRap:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maHeThongRap: { type: string, example: "BHDStar" }
 *                           tenHeThongRap: { type: string, example: "BHD Star Cineplex" }
 *                           logo: { type: string, example: "bhd-star-logo.png" }
 *                           mahom: { type: string, example: "BHDStar" }
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinHeThongRap', getCinemaSystems);

/**
 * @swagger
 * /api/QuanLyRap/LayThongTinCumRapTheoHeThong/{maHeThongRap}:
 *   get:
 *     summary: Lấy thông tin cụm rạp theo hệ thống
 *     tags: [QuanLyRap]
 *     parameters:
 *       - in: path
 *         name: maHeThongRap
 *         required: true
 *         schema:
 *           type: string
 *           example: "BHDStar"
 *         description: Mã hệ thống rạp
 *     responses:
 *       200:
 *         description: Lấy thông tin cụm rạp thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin cụm rạp thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     cumRap:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maCumRap: { type: string, example: "bhd-star-bitexco" }
 *                           tenCumRap: { type: string, example: "BHD Star Bitexco" }
 *                           hinhAnh: { type: string, example: "bitexco.jpg" }
 *                           diaChi: { type: string, example: "Lê Lợi, Q1, TP.HCM" }
 *                           maHeThongRap: { type: string, example: "BHDStar" }
 *       400:
 *         description: Mã hệ thống rạp không được để trống
 *       404:
 *         description: Không tìm thấy hệ thống rạp
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinCumRapTheoHeThong/:maHeThongRap', getCinemaClusters);

/**
 * @swagger
 * /api/QuanLyRap/LayThongTinLichChieuHeThongRap/{maHeThongRap}:
 *   get:
 *     summary: Lấy thông tin lịch chiếu theo hệ thống rạp
 *     tags: [QuanLyRap]
 *     parameters:
 *       - in: path
 *         name: maHeThongRap
 *         required: true
 *         schema:
 *           type: string
 *           example: "BHDStar"
 *         description: Mã hệ thống rạp
 *     responses:
 *       200:
 *         description: Lấy thông tin lịch chiếu hệ thống rạp thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin lịch chiếu hệ thống rạp thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     lichChieu:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maLichChieu: { type: integer, example: 1 }
 *                           maRap: { type: integer, example: 1 }
 *                           maPhim: { type: integer, example: 1 }
 *                           ngayGioChieu: { type: string, format: date-time, example: "2024-01-15T14:00:00Z" }
 *                           giaVe: { type: number, example: 75000 }
 *                           tenPhim: { type: string, example: "Avengers: Endgame" }
 *                           hinhAnh: { type: string, example: "avengers.jpg" }
 *                           tenRap: { type: string, example: "Rạp 1" }
 *       400:
 *         description: Mã hệ thống rạp không được để trống
 *       404:
 *         description: Không tìm thấy hệ thống rạp
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinLichChieuHeThongRap/:maHeThongRap', getCinemaSchedules);

/**
 * @swagger
 * /api/QuanLyRap/LayThongTinLichChieuPhim/{maPhim}:
 *   get:
 *     summary: Lấy thông tin lịch chiếu theo phim
 *     tags: [QuanLyRap]
 *     parameters:
 *       - in: path
 *         name: maPhim
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Mã phim
 *     responses:
 *       200:
 *         description: Lấy thông tin lịch chiếu phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin lịch chiếu phim thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     lichChieu:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           maLichChieu: { type: integer, example: 1 }
 *                           maRap: { type: integer, example: 1 }
 *                           maPhim: { type: integer, example: 1 }
 *                           ngayGioChieu: { type: string, format: date-time, example: "2024-01-15T14:00:00Z" }
 *                           giaVe: { type: number, example: 75000 }
 *                           tenPhim: { type: string, example: "Avengers: Endgame" }
 *                           hinhAnh: { type: string, example: "avengers.jpg" }
 *                           tenRap: { type: string, example: "Rạp 1" }
 *                           tenCumRap: { type: string, example: "BHD Star Bitexco" }
 *                           tenHeThongRap: { type: string, example: "BHD Star Cineplex" }
 *       400:
 *         description: Mã phim không được để trống
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinLichChieuPhim/:maPhim', getMovieSchedules);

export default router;


