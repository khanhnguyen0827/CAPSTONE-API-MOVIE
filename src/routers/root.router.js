import express from 'express';
import { SERVER_CONFIG } from '../common/constant/app.constant.js';

import authRoutes from './auth.router.js';
import movieRoutes from './movie.router.js';
import cinemaRoutes from './cinema.router.js';
import bookingRoutes from './booking.router.js';
import userRoutes from './user.router.js';
import bannerRoutes from './banner.router.js';
import qlndLegacyRoutes from './quan-ly-nguoi-dung.router.js';
import qlrapLegacyRoutes from './quan-ly-rap.router.js';
import qlphimLegacyRoutes from './quan-ly-phim.router.js';

const rootRouter = express.Router();
const API_PREFIX = SERVER_CONFIG.API_PREFIX;

// Health check route
rootRouter.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

rootRouter.use(`${API_PREFIX}/auth`, authRoutes);
rootRouter.use(`${API_PREFIX}/movies`, movieRoutes);
rootRouter.use(`${API_PREFIX}/cinemas`, cinemaRoutes);
// Booking module keeps legacy path to match existing routes/docs
rootRouter.use('/api/QuanLyDatVe', bookingRoutes);
rootRouter.use(`${API_PREFIX}/users`, userRoutes);
rootRouter.use(`${API_PREFIX}/banners`, bannerRoutes);
// Legacy QuanLyNguoiDung routes
rootRouter.use('/api/QuanLyNguoiDung', qlndLegacyRoutes);
// Legacy QuanLyRap routes
rootRouter.use('/api/QuanLyRap', qlrapLegacyRoutes);
// Legacy QuanLyPhim routes
rootRouter.use('/api/QuanLyPhim', qlphimLegacyRoutes);

export default rootRouter;