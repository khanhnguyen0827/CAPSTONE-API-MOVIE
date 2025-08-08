const express = require('express');
const router = express.Router();

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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Movie Ticketing System API"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 documentation:
 *                   type: string
 *                   example: "/api/v1/docs"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: string
 *                       example: "/api/v1/auth"
 *                     movies:
 *                       type: string
 *                       example: "/api/v1/movies"
 *                     cinemas:
 *                       type: string
 *                       example: "/api/v1/cinemas"
 *                     bookings:
 *                       type: string
 *                       example: "/api/v1/bookings"
 *                     users:
 *                       type: string
 *                       example: "/api/v1/users"
 *                     banners:
 *                       type: string
 *                       example: "/api/v1/banners"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   example: "running"
 */
router.get('/', (req, res) => {
  const API_PREFIX = process.env.API_PREFIX || '/api/v1';
  
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
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Movie Ticketing API is running"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 environment:
 *                   type: string
 *                   example: "development"
 */
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const environment = process.env.NODE_ENV || 'development';
  
  res.status(200).json({
    status: 'OK',
    message: 'Movie Ticketing API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.round(uptime * 1000) / 1000, // Round to 3 decimal places
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
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 memory:
 *                   type: object
 *                   properties:
 *                     used:
 *                       type: number
 *                       example: 45.2
 *                     total:
 *                       type: number
 *                       example: 1024
 *                     free:
 *                       type: number
 *                       example: 978.8
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 endpoints:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Authentication"
 *                       path:
 *                         type: string
 *                         example: "/api/v1/auth"
 *                       status:
 *                         type: string
 *                         example: "active"
 */
router.get('/status', (req, res) => {
  const uptime = process.uptime();
  const environment = process.env.NODE_ENV || 'development';
  const API_PREFIX = process.env.API_PREFIX || '/api/v1';
  
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
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Movie Ticketing API"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 description:
 *                   type: string
 *                   example: "A comprehensive API for movie ticketing system"
 *                 author:
 *                   type: string
 *                   example: "Development Team"
 *                 contact:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "support@movieticketing.com"
 *                     website:
 *                       type: string
 *                       example: "https://movieticketing.com"
 *                 documentation:
 *                   type: string
 *                   example: "/api/v1/docs"
 *                 repository:
 *                   type: string
 *                   example: "https://github.com/your-repo"
 *                 license:
 *                   type: string
 *                   example: "MIT"
 */
router.get('/info', (req, res) => {
  const API_PREFIX = process.env.API_PREFIX || '/api/v1';
  
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "pong"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
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
  const API_PREFIX = process.env.API_PREFIX || '/api/v1';
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
 *               type: object
 *               properties:
 *                 baseUrl:
 *                   type: string
 *                   example: "/api/v1"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: object
 *                       properties:
 *                         path:
 *                           type: string
 *                           example: "/api/v1/auth"
 *                         methods:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["POST", "GET"]
 *                     movies:
 *                       type: object
 *                       properties:
 *                         path:
 *                           type: string
 *                           example: "/api/v1/movies"
 *                         methods:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["GET", "POST", "PUT", "DELETE"]
 */
router.get('/api', (req, res) => {
  const API_PREFIX = process.env.API_PREFIX || '/api/v1';
  
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
      'GET /api'
    ]
  });
});

module.exports = router;