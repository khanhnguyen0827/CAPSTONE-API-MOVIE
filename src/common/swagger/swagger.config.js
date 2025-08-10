import swaggerJsdoc from 'swagger-jsdoc';
import { SERVER_CONFIG } from '../constant/app.constant.js';

// Define the options object step by step to debug
const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Movie Ticketing API',
    version: '1.0.0',
    description: 'Clean Swagger documentation for Movie Ticketing API',
  },
  servers: [
    { url: `http://localhost:${SERVER_CONFIG.PORT}${SERVER_CONFIG.API_PREFIX}`, description: 'API prefix' },
    { url: `http://localhost:${SERVER_CONFIG.PORT}`, description: 'Root' },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token từ đăng nhập'
      },
      TokenCybersoft: {
        type: 'apiKey',
        in: 'header',
        name: 'TokenCybersoft',
        description: 'Token xác thực từ Cybersoft'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          taiKhoan: { type: 'string', example: 'user123' },
          hoTen: { type: 'string', example: 'Nguyễn Văn A' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          soDT: { type: 'string', example: '0123456789' },
          loaiNguoiDung: { type: 'string', example: 'KhachHang' },
          matKhau: { type: 'string', example: 'hashedPassword' }
        }
      },
      Movie: {
        type: 'object',
        properties: {
          maPhim: { type: 'integer', example: 1 },
          tenPhim: { type: 'string', example: 'Avengers: Endgame' },
          trailer: { type: 'string', example: 'https://youtube.com/watch?v=...' },
          moTa: { type: 'string', example: 'Phim siêu anh hùng Marvel' },
          ngayKhoiChieu: { type: 'string', format: 'date', example: '2024-01-15' },
          danhGia: { type: 'integer', minimum: 1, maximum: 10, example: 9 },
          hot: { type: 'boolean', example: true },
          dangChieu: { type: 'boolean', example: true },
          sapChieu: { type: 'boolean', example: false },
          hinhAnh: { type: 'string', example: 'avengers.jpg' }
        }
      },
      Booking: {
        type: 'object',
        properties: {
          maDatVe: { type: 'integer', example: 1 },
          maLichChieu: { type: 'integer', example: 1 },
          maGhe: { type: 'integer', example: 1 },
          taiKhoanNguoiDung: { type: 'string', example: 'user123' },
          ngayDat: { type: 'string', format: 'date-time', example: '2024-01-15T14:00:00Z' },
          giaVe: { type: 'number', example: 75000 }
        }
      },
      Schedule: {
        type: 'object',
        properties: {
          maLichChieu: { type: 'integer', example: 1 },
          maRap: { type: 'integer', example: 1 },
          maPhim: { type: 'integer', example: 1 },
          ngayGioChieu: { type: 'string', format: 'date-time', example: '2024-01-15T14:00:00Z' },
          giaVe: { type: 'number', example: 75000 }
        }
      },
      CinemaSystem: {
        type: 'object',
        properties: {
          maHeThongRap: { type: 'string', example: 'BHDStar' },
          tenHeThongRap: { type: 'string', example: 'BHD Star Cineplex' },
          logo: { type: 'string', example: 'bhd-star-logo.png' },
          mahom: { type: 'string', example: 'BHDStar' }
        }
      },
      CinemaCluster: {
        type: 'object',
        properties: {
          maCumRap: { type: 'string', example: 'bhd-star-bitexco' },
          tenCumRap: { type: 'string', example: 'BHD Star Bitexco' },
          hinhAnh: { type: 'string', example: 'bitexco.jpg' },
          diaChi: { type: 'string', example: 'Lê Lợi, Q1, TP.HCM' },
          maHeThongRap: { type: 'string', example: 'BHDStar' }
        }
      }
    }
  }
};

const apis = [
  'src/routers/*.js',
  'src/controllers/*.js'
];

const options = {
  definition,
  apis
};

const swaggerSpecs = swaggerJsdoc(options);

// Filter out standard REST API groups to only show legacy API groups
const filteredSpecs = {
  ...swaggerSpecs,
  paths: Object.fromEntries(
    Object.entries(swaggerSpecs.paths).filter(([path, methods]) => {
      // Keep only legacy API paths and Auth paths
      return path.includes('/QuanLy') || path.includes('/auth') || path.includes('/api/v1');
    })
  )
};

export default filteredSpecs;
