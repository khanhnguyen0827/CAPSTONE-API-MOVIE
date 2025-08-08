import express from 'express';
const router = express.Router();

// Import constants
import { SERVER_CONFIG, API_MESSAGES } from '../common/constant/app.constant.js';

// Import child routers
import authRoutes from './auth.router.js';
import movieRoutes from './movie.router.js';
import cinemaRoutes from './cinema.router.js';
import bookingRoutes from './booking.router.js';
import userRoutes from './user.router.js';
import bannerRoutes from './banner.router.js';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint - API Information
 *     description: Returns basic information about the Movie Ticketing API
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: API information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RootResponse'
 */
router.get('/', (req, res) => {
  const API_PREFIX = SERVER_CONFIG.API_PREFIX;
  
  res.json({
    message: 'Welcome to Movie Ticketing System API',
    version: '1.0.0',
    documentation: `${API_PREFIX}/docs`,
    endpoints: {
      auth: `${API_PREFIX}/auth`,
      movies: `${API_PREFIX}/movies`,
      cinemas: `${API_PREFIX}/cinemas`,
      bookings: `${API_PREFIX}/bookings`,
      users: `${API_PREFIX}/users`,
      banners: `${API_PREFIX}/banners`
    },
    timestamp: new Date().toISOString(),
    status: 'running'
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Check if the API is running properly
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const environment = SERVER_CONFIG.NODE_ENV;
  
  res.status(200).json({
    status: 'OK',
    message: 'Movie Ticketing API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.round(uptime * 1000) / 1000,
    environment: environment
  });
});

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Detailed Status
 *     description: Get detailed status information about the API
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Detailed status information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusResponse'
 */
router.get('/status', (req, res) => {
  const uptime = process.uptime();
  const environment = SERVER_CONFIG.NODE_ENV;
  const API_PREFIX = SERVER_CONFIG.API_PREFIX;
  
  // Get memory usage
  const memUsage = process.memoryUsage();
  const memory = {
    used: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
    total: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100,
    free: Math.round(((memUsage.heapTotal - memUsage.heapUsed) / 1024 / 1024) * 100) / 100
  };
  
  const endpoints = [
    { name: 'Authentication', path: `${API_PREFIX}/auth`, status: 'active' },
    { name: 'Movies', path: `${API_PREFIX}/movies`, status: 'active' },
    { name: 'Cinemas', path: `${API_PREFIX}/cinemas`, status: 'active' },
    { name: 'Bookings', path: `${API_PREFIX}/bookings`, status: 'active' },
    { name: 'Users', path: `${API_PREFIX}/users`, status: 'active' },
    { name: 'Banners', path: `${API_PREFIX}/banners`, status: 'active' }
  ];
  
  res.json({
    status: 'healthy',
    version: '1.0.0',
    environment: environment,
    timestamp: new Date().toISOString(),
    memory: memory,
    uptime: Math.round(uptime * 1000) / 1000,
    endpoints: endpoints
  });
});

/**
 * @swagger
 * /info:
 *   get:
 *     summary: API Information
 *     description: Get detailed information about the API
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: API information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfoResponse'
 */
router.get('/info', (req, res) => {
  const API_PREFIX = SERVER_CONFIG.API_PREFIX;
  
  res.json({
    name: 'Movie Ticketing API',
    version: '1.0.0',
    description: 'A comprehensive API for movie ticketing system with authentication, movie management, cinema operations, booking system, and user management.',
    author: 'Development Team',
    contact: {
      email: 'support@movieticketing.com',
      website: 'https://movieticketing.com'
    },
    documentation: `${API_PREFIX}/docs`,
    repository: 'https://github.com/your-repo',
    license: 'MIT',
    features: [
      'JWT Authentication',
      'Movie Management',
      'Cinema Operations',
      'Booking System',
      'User Management',
      'File Upload',
      'Swagger Documentation'
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'Prisma ORM',
      'MySQL',
      'JWT',
      'Swagger UI'
    ]
  });
});

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping Test
 *     description: Simple ping endpoint to test connectivity
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Pong response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResponse'
 */
router.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Redirect to Documentation
 *     description: Redirects to the Swagger documentation
 *     tags: [Root]
 *     responses:
 *       301:
 *         description: Redirect to documentation
 */
router.get('/docs', (req, res) => {
  const API_PREFIX = SERVER_CONFIG.API_PREFIX;
  res.redirect(`${API_PREFIX}/docs`);
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API Base Information
 *     description: Get information about the API base endpoints
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: API base information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiInfoResponse'
 */
router.get('/api', (req, res) => {
  const API_PREFIX = SERVER_CONFIG.API_PREFIX;
  
  res.json({
    baseUrl: API_PREFIX,
    endpoints: {
      auth: {
        path: `${API_PREFIX}/auth`,
        methods: ['POST', 'GET'],
        description: 'Authentication endpoints'
      },
      movies: {
        path: `${API_PREFIX}/movies`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'Movie management endpoints'
      },
      cinemas: {
        path: `${API_PREFIX}/cinemas`,
        methods: ['GET'],
        description: 'Cinema information endpoints'
      },
      bookings: {
        path: `${API_PREFIX}/bookings`,
        methods: ['GET', 'POST'],
        description: 'Booking management endpoints'
      },
      users: {
        path: `${API_PREFIX}/users`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        description: 'User management endpoints'
      },
      banners: {
        path: `${API_PREFIX}/banners`,
        methods: ['GET'],
        description: 'Banner management endpoints'
      }
    },
    documentation: `${API_PREFIX}/docs`,
    version: '1.0.0'
  });
});

// Mount child routers with API prefix
const API_PREFIX = SERVER_CONFIG.API_PREFIX;

/**
 * @swagger
 * /api/v1/auth:
 *   get:
 *     summary: Authentication Module
 *     description: All authentication related endpoints
 *     tags: [Authentication]
 */
router.use(`${API_PREFIX}/auth`, authRoutes);

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Movies Module
 *     description: All movie management endpoints
 *     tags: [Movies]
 */
router.use(`${API_PREFIX}/movies`, movieRoutes);

/**
 * @swagger
 * /api/v1/cinemas:
 *   get:
 *     summary: Cinemas Module
 *     description: All cinema information endpoints
 *     tags: [Cinemas]
 */
router.use(`${API_PREFIX}/cinemas`, cinemaRoutes);

/**
 * @swagger
 * /api/QuanLyDatVe:
 *   get:
 *     summary: Quản lý đặt vé Module
 *     description: All ticket management and booking endpoints
 *     tags: [QuanLyDatVe]
 */
router.use('/api/QuanLyDatVe', bookingRoutes);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Users Module
 *     description: All user management endpoints
 *     tags: [Users]
 */
router.use(`${API_PREFIX}/users`, userRoutes);

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Banners Module
 *     description: All banner management endpoints
 *     tags: [Banners]
 */
router.use(`${API_PREFIX}/banners`, bannerRoutes);

// 404 handler for root router
router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /',
      'GET /health',
      'GET /status',
      'GET /info',
      'GET /ping',
      'GET /docs',
      'GET /api',
      `${API_PREFIX}/auth/*`,
      `${API_PREFIX}/movies/*`,
      `${API_PREFIX}/cinemas/*`,
      `${API_PREFIX}/bookings/*`,
      `${API_PREFIX}/users/*`,
      `${API_PREFIX}/banners/*`
    ]
  });
});

export default router;