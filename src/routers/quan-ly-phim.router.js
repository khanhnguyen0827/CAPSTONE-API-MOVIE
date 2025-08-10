import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../common/middlewares/protect.middleware.js';
import {
  getMovies,
  getMoviesPaginated,
  getMoviesByDate,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage
} from '../controllers/movie.controller.js';
import { getBanners } from '../controllers/banner.controller.js';
import { validateMovie, validateMovieUpdate } from '../common/validators/movie.validator.js';

const router = express.Router();

// Multer config (reuse memory storage like movie.router)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    cb(new Error('Chỉ chấp nhận file hình ảnh'));
  }
});

/**
 * @swagger
 * tags:
 *   - name: QuanLyPhim
 *     description: Quản lý phim (legacy-compatible)
 */

/**
 * @swagger
 * /api/QuanLyPhim/LayDanhSachBanner:
 *   get:
 *     summary: Lấy danh sách banner
 *     tags: [QuanLyPhim]
 *     responses:
 *       200:
 *         description: Lấy danh sách banner thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách banner thành công" }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       maBanner: { type: integer, example: 1 }
 *                       maPhim: { type: integer, example: 1 }
 *                       hinhAnh: { type: string, example: "banner1.jpg" }
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachBanner', getBanners);

/**
 * @swagger
 * /api/QuanLyPhim/LayDanhSachPhim:
 *   get:
 *     summary: Lấy danh sách tất cả phim
 *     tags: [QuanLyPhim]
 *     responses:
 *       200:
 *         description: Lấy danh sách phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách phim thành công" }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Movie' }
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachPhim', getMovies);

/**
 * @swagger
 * /api/QuanLyPhim/LayDanhSachPhimPhanTrang:
 *   get:
 *     summary: Lấy danh sách phim phân trang
 *     tags: [QuanLyPhim]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 10 }
 *         description: Số lượng phim mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách phim phân trang thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách phim phân trang thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     movies: { type: array, items: { $ref: '#/components/schemas/Movie' } }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer, example: 1 }
 *                         limit: { type: integer, example: 10 }
 *                         total: { type: integer, example: 100 }
 *                         totalPages: { type: integer, example: 10 }
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachPhimPhanTrang', getMoviesPaginated);

/**
 * @swagger
 * /api/QuanLyPhim/LayDanhSachPhimTheoNgay:
 *   get:
 *     summary: Lấy danh sách phim theo ngày khởi chiếu
 *     tags: [QuanLyPhim]
 *     parameters:
 *       - in: query
 *         name: ngayKhoiChieu
 *         required: true
 *         schema: { type: string, format: date, example: '2024-01-15' }
 *         description: Ngày khởi chiếu (định dạng YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lấy danh sách phim theo ngày thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách phim theo ngày thành công" }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Movie' }
 *       400:
 *         description: Ngày khởi chiếu không được để trống
 *       500:
 *         description: Lỗi server
 */
router.get('/LayDanhSachPhimTheoNgay', getMoviesByDate);

/**
 * @swagger
 * /api/QuanLyPhim/ThemPhimUploadHinh:
 *   post:
 *     summary: Thêm phim mới (kèm upload hình)
 *     tags: [QuanLyPhim]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [tenPhim, trailer, moTa, ngayKhoiChieu, danhGia, hinhAnh]
 *             properties:
 *               tenPhim:
 *                 type: string
 *                 example: "Avengers: Endgame"
 *                 description: Tên phim
 *               trailer:
 *                 type: string
 *                 example: "https://youtube.com/watch?v=..."
 *                 description: Link trailer
 *               moTa:
 *                 type: string
 *                 example: "Phim siêu anh hùng Marvel"
 *                 description: Mô tả phim
 *               ngayKhoiChieu:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *                 description: Ngày khởi chiếu
 *               danhGia:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 9
 *                 description: Đánh giá phim (1-10)
 *               hot:
 *                 type: boolean
 *                 example: true
 *                 description: Phim hot
 *               dangChieu:
 *                 type: boolean
 *                 example: true
 *                 description: Phim đang chiếu
 *               sapChieu:
 *                 type: boolean
 *                 example: false
 *                 description: Phim sắp chiếu
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh phim
 *     responses:
 *       201:
 *         description: Tạo phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Tạo phim thành công" }
 *                 data: { $ref: '#/components/schemas/Movie' }
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
router.post('/ThemPhimUploadHinh', protect, adminOnly, upload.single('hinhAnh'), validateMovie, createMovie);

/**
 * @swagger
 * /api/QuanLyPhim/CapNhatPhimUpload:
 *   post:
 *     summary: Cập nhật phim (kèm upload hình)
 *     tags: [QuanLyPhim]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [maPhim]
 *             properties:
 *               maPhim:
 *                 type: integer
 *                 example: 1
 *                 description: Mã phim cần cập nhật
 *               tenPhim:
 *                 type: string
 *                 example: "Avengers: Endgame (Updated)"
 *                 description: Tên phim mới
 *               trailer:
 *                 type: string
 *                 example: "https://youtube.com/watch?v=..."
 *                 description: Link trailer mới
 *               moTa:
 *                 type: string
 *                 example: "Phim siêu anh hùng Marvel - Cập nhật"
 *                 description: Mô tả phim mới
 *               ngayKhoiChieu:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-20"
 *                 description: Ngày khởi chiếu mới
 *               danhGia:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 10
 *                 description: Đánh giá phim mới
 *               hot:
 *                 type: boolean
 *                 example: true
 *                 description: Trạng thái hot mới
 *               dangChieu:
 *                 type: boolean
 *                 example: true
 *                 description: Trạng thái đang chiếu mới
 *               sapChieu:
 *                 type: boolean
 *                 example: false
 *                 description: Trạng thái sắp chiếu mới
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh phim mới (không bắt buộc)
 *     responses:
 *       200:
 *         description: Cập nhật phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Cập nhật phim thành công" }
 *                 data: { $ref: '#/components/schemas/Movie' }
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi server
 */
router.post('/CapNhatPhimUpload', protect, adminOnly, (req, res, next) => {
  if (req.body && req.body.maPhim) req.params.maPhim = req.body.maPhim;
  next();
}, upload.single('hinhAnh'), validateMovieUpdate, updateMovie);

/**
 * @swagger
 * /api/QuanLyPhim/LayThongTinPhim:
 *   get:
 *     summary: Lấy thông tin phim theo mã
 *     tags: [QuanLyPhim]
 *     parameters:
 *       - in: query
 *         name: maPhim
 *         required: true
 *         schema: { type: integer, example: 1 }
 *         description: Mã phim cần lấy thông tin
 *     responses:
 *       200:
 *         description: Lấy thông tin phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy thông tin phim thành công" }
 *                 data: { $ref: '#/components/schemas/Movie' }
 *       400:
 *         description: Mã phim không được để trống
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi server
 */
router.get('/LayThongTinPhim', getMovieById);

/**
 * @swagger
 * /api/QuanLyPhim/XoaPhim:
 *   delete:
 *     summary: Xóa phim theo mã
 *     tags: [QuanLyPhim]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: maPhim
 *         required: true
 *         schema: { type: integer, example: 1 }
 *         description: Mã phim cần xóa
 *     responses:
 *       200:
 *         description: Xóa phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Xóa phim thành công" }
 *                 data: { type: null, example: null }
 *       400:
 *         description: Mã phim không được để trống
 *       401:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi server
 */
router.delete('/XoaPhim', protect, adminOnly, (req, res, next) => {
  if (req.query && req.query.maPhim) req.params.maPhim = req.query.maPhim;
  next();
}, deleteMovie);

export default router;


