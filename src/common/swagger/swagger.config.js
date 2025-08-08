const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Ticketing API',
      version: '1.0.0',
      description: 'API documentation for Movie Ticketing System',
      contact: {
        name: 'API Support',
        email: 'support@movieticketing.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // User schemas
        User: {
          type: 'object',
          properties: {
            taiKhoan: { type: 'string', example: 'user123' },
            hoTen: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            soDT: { type: 'string', example: '0123456789' },
            loaiNguoiDung: { type: 'string', enum: ['KhachHang', 'QuanTri'], example: 'KhachHang' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['taiKhoan', 'matKhau'],
          properties: {
            taiKhoan: { type: 'string', example: 'user123' },
            matKhau: { type: 'string', example: 'password123' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['taiKhoan', 'matKhau', 'hoTen', 'email', 'soDT'],
          properties: {
            taiKhoan: { type: 'string', example: 'user123' },
            matKhau: { type: 'string', example: 'password123' },
            hoTen: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            soDT: { type: 'string', example: '0123456789' },
            loaiNguoiDung: { type: 'string', enum: ['KhachHang', 'QuanTri'], example: 'KhachHang' }
          }
        },
        // Movie schemas
        Movie: {
          type: 'object',
          properties: {
            maPhim: { type: 'integer', example: 1 },
            tenPhim: { type: 'string', example: 'Avengers: Endgame' },
            trailer: { type: 'string', example: 'https://www.youtube.com/watch?v=TcMBFSGVi1c' },
            hinhAnh: { type: 'string', example: 'avengers.jpg' },
            moTa: { type: 'string', example: 'Biệt đội siêu anh hùng: Hồi kết' },
            ngayKhoiChieu: { type: 'string', format: 'date', example: '2019-04-26' },
            danhGia: { type: 'integer', minimum: 1, maximum: 10, example: 9 },
            hot: { type: 'boolean', example: true },
            dangChieu: { type: 'boolean', example: true },
            sapChieu: { type: 'boolean', example: false }
          }
        },
        CreateMovieRequest: {
          type: 'object',
          required: ['tenPhim', 'trailer', 'moTa', 'ngayKhoiChieu', 'danhGia'],
          properties: {
            tenPhim: { type: 'string', example: 'Avengers: Endgame' },
            trailer: { type: 'string', example: 'https://www.youtube.com/watch?v=TcMBFSGVi1c' },
            moTa: { type: 'string', example: 'Biệt đội siêu anh hùng: Hồi kết' },
            ngayKhoiChieu: { type: 'string', format: 'date', example: '2019-04-26' },
            danhGia: { type: 'integer', minimum: 1, maximum: 10, example: 9 },
            hot: { type: 'boolean', example: true },
            dangChieu: { type: 'boolean', example: true },
            sapChieu: { type: 'boolean', example: false }
          }
        },
        // Banner schemas
        Banner: {
          type: 'object',
          properties: {
            maBanner: { type: 'integer', example: 1 },
            maPhim: { type: 'integer', example: 1 },
            hinhAnh: { type: 'string', example: 'banner-avengers.jpg' },
            phim: { $ref: '#/components/schemas/Movie' }
          }
        },
        // Cinema schemas
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
            diaChi: { type: 'string', example: 'L3 - Bitexco Icon68, 2 Hải Triều, Q.1, TP.HCM' },
            maHeThongRap: { type: 'string', example: 'BHDStar' }
          }
        },
        Theater: {
          type: 'object',
          properties: {
            maRap: { type: 'integer', example: 1 },
            tenRap: { type: 'string', example: 'Rạp 1' },
            maCumRap: { type: 'string', example: 'bhd-star-bitexco' }
          }
        },
        // Schedule schemas
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
        // Booking schemas
        Seat: {
          type: 'object',
          properties: {
            maGhe: { type: 'integer', example: 1 },
            tenGhe: { type: 'string', example: 'A1' },
            hang: { type: 'string', example: 'A' },
            soGhe: { type: 'integer', example: 1 },
            loaiGhe: { type: 'string', example: 'Vip' },
            giaGhe: { type: 'number', example: 75000 },
            daDat: { type: 'boolean', example: false }
          }
        },
        BookingRequest: {
          type: 'object',
          required: ['maLichChieu', 'danhSachVe', 'taiKhoan'],
          properties: {
            maLichChieu: { type: 'integer', example: 1 },
            danhSachVe: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  maGhe: { type: 'integer', example: 1 },
                  giaVe: { type: 'number', example: 75000 }
                }
              }
            },
            taiKhoan: { type: 'string', example: 'user123' }
          }
        },
        // Response schemas
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Thành công' },
            data: { type: 'object' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Lỗi xảy ra' },
            statusCode: { type: 'integer', example: 500 },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        // Root schemas
        RootResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Welcome to Movie Ticketing System API' },
            version: { type: 'string', example: '1.0.0' },
            documentation: { type: 'string', example: '/api/v1/docs' },
            endpoints: {
              type: 'object',
              properties: {
                auth: { type: 'string', example: '/api/v1/auth' },
                movies: { type: 'string', example: '/api/v1/movies' },
                cinemas: { type: 'string', example: '/api/v1/cinemas' },
                bookings: { type: 'string', example: '/api/v1/bookings' },
                users: { type: 'string', example: '/api/v1/users' },
                banners: { type: 'string', example: '/api/v1/banners' }
              }
            },
            timestamp: { type: 'string', format: 'date-time' },
            status: { type: 'string', example: 'running' }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'OK' },
            message: { type: 'string', example: 'Movie Ticketing API is running' },
            timestamp: { type: 'string', format: 'date-time' },
            version: { type: 'string', example: '1.0.0' },
            uptime: { type: 'number', example: 123.456 },
            environment: { type: 'string', example: 'development' }
          }
        },
        StatusResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'healthy' },
            version: { type: 'string', example: '1.0.0' },
            environment: { type: 'string', example: 'development' },
            timestamp: { type: 'string', format: 'date-time' },
            memory: {
              type: 'object',
              properties: {
                used: { type: 'number', example: 45.2 },
                total: { type: 'number', example: 1024 },
                free: { type: 'number', example: 978.8 }
              }
            },
            uptime: { type: 'number', example: 123.456 },
            endpoints: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Authentication' },
                  path: { type: 'string', example: '/api/v1/auth' },
                  status: { type: 'string', example: 'active' }
                }
              }
            }
          }
        },
        InfoResponse: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Movie Ticketing API' },
            version: { type: 'string', example: '1.0.0' },
            description: { type: 'string', example: 'A comprehensive API for movie ticketing system' },
            author: { type: 'string', example: 'Development Team' },
            contact: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'support@movieticketing.com' },
                website: { type: 'string', example: 'https://movieticketing.com' }
              }
            },
            documentation: { type: 'string', example: '/api/v1/docs' },
            repository: { type: 'string', example: 'https://github.com/your-repo' },
            license: { type: 'string', example: 'MIT' },
            features: {
              type: 'array',
              items: { type: 'string' },
              example: ['JWT Authentication', 'Movie Management', 'Cinema Operations']
            },
            technologies: {
              type: 'array',
              items: { type: 'string' },
              example: ['Node.js', 'Express.js', 'Prisma ORM', 'MySQL']
            }
          }
        },
        PingResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'pong' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        ApiInfoResponse: {
          type: 'object',
          properties: {
            baseUrl: { type: 'string', example: '/api/v1' },
            endpoints: {
              type: 'object',
              properties: {
                auth: {
                  type: 'object',
                  properties: {
                    path: { type: 'string', example: '/api/v1/auth' },
                    methods: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['POST', 'GET']
                    },
                    description: { type: 'string', example: 'Authentication endpoints' }
                  }
                },
                movies: {
                  type: 'object',
                  properties: {
                    path: { type: 'string', example: '/api/v1/movies' },
                    methods: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['GET', 'POST', 'PUT', 'DELETE']
                    },
                    description: { type: 'string', example: 'Movie management endpoints' }
                  }
                }
              }
            },
            documentation: { type: 'string', example: '/api/v1/docs' },
            version: { type: 'string', example: '1.0.0' }
          }
        }
      }
    }
  },
  apis: [
    './src/routers/*.js',
    './src/controllers/*.js',
    './server.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
