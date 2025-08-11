import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

// Import constants
import { 
  SERVER_CONFIG, 
  RATE_LIMIT_CONFIG, 
  UPLOAD_CONFIG 
} from './src/common/constant/app.constant.js';

// Import Swagger specs and setup
import swaggerSpecs from './src/common/swagger/swagger.config.js';
import swaggerUIOptions from './src/common/swagger/swagger-setup.js';

// Import parent router
import rootRoutes from './src/routers/root.router.js';

// Import middleware
import { errorHandler } from './src/common/helpers/handle-err.helper.js';

const app = express();
const PORT = process.env.PORT || SERVER_CONFIG.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: SERVER_CONFIG.CORS_ORIGIN,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.WINDOW_MS,
  max: RATE_LIMIT_CONFIG.MAX_REQUESTS,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(UPLOAD_CONFIG.UPLOAD_PATH));

// Swagger Documentation
const API_PREFIX = SERVER_CONFIG.API_PREFIX;
app.use(`${API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerUIOptions));

// Direct access to OpenAPI spec
app.get(`${API_PREFIX}/docs/swagger.json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpecs);
});

// Parent Router (manages all child routers)
app.use('/', rootRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}${API_PREFIX}/docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;

