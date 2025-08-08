const express = require('express');
const { 
  getCinemaSystems, 
  getCinemaClusters, 
  getCinemaSchedules, 
  getMovieSchedules 
} = require('../controllers/cinema.controller');

const router = express.Router();

/**
 * @swagger
 * /cinemas/lay-thong-tin-he-thong-rap:
 *   get:
 *     summary: Lấy thông tin hệ thống rạp
 *     tags: [Cinemas]
 *     responses:
 *       200:
 *         description: Lấy thông tin hệ thống rạp thành công
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
 *                   example: Lấy thông tin hệ thống rạp thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     heThongRap:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CinemaSystem'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-thong-tin-he-thong-rap', getCinemaSystems);

/**
 * @swagger
 * /cinemas/lay-thong-tin-cum-rap-theo-he-thong/{maHeThongRap}:
 *   get:
 *     summary: Lấy thông tin cụm rạp theo hệ thống
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: maHeThongRap
 *         required: true
 *         schema:
 *           type: string
 *           example: 'BHDStar'
 *         description: Mã hệ thống rạp
 *     responses:
 *       200:
 *         description: Lấy thông tin cụm rạp thành công
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
 *                   example: Lấy thông tin cụm rạp thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     heThongRap:
 *                       $ref: '#/components/schemas/CinemaSystem'
 *                     cumRap:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CinemaCluster'
 *       404:
 *         description: Không tìm thấy hệ thống rạp
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
router.get('/lay-thong-tin-cum-rap-theo-he-thong/:maHeThongRap', getCinemaClusters);

/**
 * @swagger
 * /cinemas/lay-thong-tin-lich-chieu-he-thong-rap/{maHeThongRap}:
 *   get:
 *     summary: Lấy thông tin lịch chiếu theo hệ thống rạp
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: maHeThongRap
 *         required: true
 *         schema:
 *           type: string
 *           example: 'BHDStar'
 *         description: Mã hệ thống rạp
 *     responses:
 *       200:
 *         description: Lấy thông tin lịch chiếu thành công
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
 *                   example: Lấy thông tin lịch chiếu thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     heThongRap:
 *                       $ref: '#/components/schemas/CinemaSystem'
 *                     cumRap:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           cumRap:
 *                             $ref: '#/components/schemas/CinemaCluster'
 *                           lichChieuPhim:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 phim:
 *                                   $ref: '#/components/schemas/Movie'
 *                                 lichChieu:
 *                                   type: array
 *                                   items:
 *                                     $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Không tìm thấy hệ thống rạp
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
router.get('/lay-thong-tin-lich-chieu-he-thong-rap/:maHeThongRap', getCinemaSchedules);

/**
 * @swagger
 * /cinemas/lay-thong-tin-lich-chieu-phim/{maPhim}:
 *   get:
 *     summary: Lấy thông tin lịch chiếu theo phim
 *     tags: [Cinemas]
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy thông tin lịch chiếu phim thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     heThongRap:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           heThongRap:
 *                             $ref: '#/components/schemas/CinemaSystem'
 *                           cumRap:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 cumRap:
 *                                   $ref: '#/components/schemas/CinemaCluster'
 *                                 lichChieuPhim:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       phim:
 *                                         $ref: '#/components/schemas/Movie'
 *                                       lichChieu:
 *                                         type: array
 *                                         items:
 *                                           $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Không tìm thấy phim
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
router.get('/lay-thong-tin-lich-chieu-phim/:maPhim', getMovieSchedules);

module.exports = router;
