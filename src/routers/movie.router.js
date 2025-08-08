const express = require('express');
const multer = require('multer');
const { 
  getMovies, 
  getMoviesPaginated, 
  getMoviesByDate, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie,
  uploadImage 
} = require('../controllers/movie.controller');
const { validateMovie, validateMovieUpdate } = require('../common/validators/movie.validator');
const { protect, adminOnly } = require('../common/middlewares/protect.middleware');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file hình ảnh'), false);
    }
  }
});

/**
 * @swagger
 * /movies/lay-danh-sach-phim:
 *   get:
 *     summary: Lấy danh sách tất cả phim
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lấy danh sách phim thành công
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
 *                   example: Lấy danh sách phim thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     movies:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-phim', getMovies);

/**
 * @swagger
 * /movies/lay-danh-sach-phim-phan-trang:
 *   get:
 *     summary: Lấy danh sách phim phân trang
 *     tags: [Movies]
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
 *         description: Số lượng phim mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách phim phân trang thành công
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
 *                   example: Lấy danh sách phim phân trang thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     movies:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
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
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/lay-danh-sach-phim-phan-trang', getMoviesPaginated);

/**
 * @swagger
 * /movies/lay-danh-sach-phim-theo-ngay:
 *   get:
 *     summary: Lấy danh sách phim theo ngày khởi chiếu
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: ngayKhoiChieu
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: '2024-01-15'
 *         description: Ngày khởi chiếu (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lấy danh sách phim theo ngày thành công
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
 *                   example: Lấy danh sách phim theo ngày thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     movies:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Ngày không hợp lệ
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
router.get('/lay-danh-sach-phim-theo-ngay', getMoviesByDate);

/**
 * @swagger
 * /movies/lay-thong-tin-phim/{maPhim}:
 *   get:
 *     summary: Lấy thông tin chi tiết phim
 *     tags: [Movies]
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
 *         description: Lấy thông tin phim thành công
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
 *                   example: Lấy thông tin phim thành công
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
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
router.get('/lay-thong-tin-phim/:maPhim', getMovieById);

/**
 * @swagger
 * /movies/them-phim:
 *   post:
 *     summary: Thêm phim mới (Chỉ admin)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - tenPhim
 *               - trailer
 *               - moTa
 *               - ngayKhoiChieu
 *               - danhGia
 *             properties:
 *               tenPhim:
 *                 type: string
 *                 example: 'Avengers: Endgame'
 *               trailer:
 *                 type: string
 *                 example: 'https://www.youtube.com/watch?v=TcMBFSGVi1c'
 *               moTa:
 *                 type: string
 *                 example: 'Biệt đội siêu anh hùng: Hồi kết'
 *               ngayKhoiChieu:
 *                 type: string
 *                 format: date
 *                 example: '2019-04-26'
 *               danhGia:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 9
 *               hot:
 *                 type: boolean
 *                 example: true
 *               dangChieu:
 *                 type: boolean
 *                 example: true
 *               sapChieu:
 *                 type: boolean
 *                 example: false
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh phim
 *     responses:
 *       201:
 *         description: Thêm phim thành công
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
 *                   example: Thêm phim thành công
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
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
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/them-phim', protect, adminOnly, upload.single('hinhAnh'), validateMovie, createMovie);

/**
 * @swagger
 * /movies/cap-nhat-phim/{maPhim}:
 *   put:
 *     summary: Cập nhật thông tin phim (Chỉ admin)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: maPhim
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Mã phim
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tenPhim:
 *                 type: string
 *                 example: 'Avengers: Endgame'
 *               trailer:
 *                 type: string
 *                 example: 'https://www.youtube.com/watch?v=TcMBFSGVi1c'
 *               moTa:
 *                 type: string
 *                 example: 'Biệt đội siêu anh hùng: Hồi kết'
 *               ngayKhoiChieu:
 *                 type: string
 *                 format: date
 *                 example: '2019-04-26'
 *               danhGia:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 9
 *               hot:
 *                 type: boolean
 *                 example: true
 *               dangChieu:
 *                 type: boolean
 *                 example: true
 *               sapChieu:
 *                 type: boolean
 *                 example: false
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh phim mới
 *     responses:
 *       200:
 *         description: Cập nhật phim thành công
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
 *                   example: Cập nhật phim thành công
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
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
router.put('/cap-nhat-phim/:maPhim', protect, adminOnly, upload.single('hinhAnh'), validateMovieUpdate, updateMovie);

/**
 * @swagger
 * /movies/xoa-phim/{maPhim}:
 *   delete:
 *     summary: Xóa phim (Chỉ admin)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
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
 *         description: Xóa phim thành công
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
 *                   example: Xóa phim thành công
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
router.delete('/xoa-phim/:maPhim', protect, adminOnly, deleteMovie);

/**
 * @swagger
 * /movies/upload-hinh-anh:
 *   post:
 *     summary: Upload hình ảnh phim (Chỉ admin)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - hinhAnh
 *             properties:
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh phim
 *     responses:
 *       200:
 *         description: Upload hình ảnh thành công
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
 *                   example: Upload hình ảnh thành công
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: '/uploads/movies/1234567890-image.jpg'
 *       400:
 *         description: Không có file được upload hoặc file không hợp lệ
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
router.post('/upload-hinh-anh', protect, adminOnly, upload.single('hinhAnh'), uploadImage);

module.exports = router;
