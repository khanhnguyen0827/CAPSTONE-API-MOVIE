import express from 'express';
import { getBanners } from '../controllers/banner.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /banners/lay-danh-sach-banner:
 *   get:
 *     summary: Lấy danh sách banner
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Lấy danh sách banner thành công
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
 *                   example: Lấy danh sách banner thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     banners:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-banner', getBanners);

// RESTful route aliases for testing compatibility
router.get('/', protect, getBanners); // GET /api/v1/banners

export default router;
