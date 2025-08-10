# Movie Ticketing System API

A comprehensive REST API for a movie ticketing system built with Node.js, Express, and Prisma ORM.

## Features

- **User Management**: Registration, login, profile management
- **Movie Management**: CRUD operations for movies with image upload
- **Cinema Management**: Theater systems, clusters, and schedules
- **Booking System**: Ticket booking and seat management
- **Banner Management**: Promotional banners
- **Authentication**: JWT-based authentication with role-based access control
- **File Upload**: Image upload for movies and banners
- **Validation**: Request validation using Joi
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js (v16 or higher)
- MySQL Database
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CAPSTONE-API-MOVIE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DATABASE_URL="mysql://root:123456@localhost:3306/movie_ticketing_system"
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRES_IN=7d
   
   # File Upload Configuration
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=5242880
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # API Configuration
   API_PREFIX=/api/v1
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Open Prisma Studio
   npx prisma studio
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/dang-nhap` - User login
- `POST /api/v1/auth/dang-ky` - User registration
- `POST /api/v1/auth/thong-tin-tai-khoan` - Get user info

### User Management
- `GET /api/v1/users/lay-danh-sach-nguoi-dung` - Get all users
- `GET /api/v1/users/lay-danh-sach-nguoi-dung-phan-trang` - Get users with pagination
- `GET /api/v1/users/tim-kiem-nguoi-dung` - Search users
- `GET /api/v1/users/lay-danh-sach-loai-nguoi-dung` - Get user types
- `POST /api/v1/users/lay-thong-tin-nguoi-dung` - Get user by ID
- `POST /api/v1/users/them-nguoi-dung` - Create user
- `PUT /api/v1/users/cap-nhat-thong-tin-nguoi-dung` - Update user
- `DELETE /api/v1/users/xoa-nguoi-dung` - Delete user

### Movie Management
- `GET /api/v1/movies/lay-danh-sach-phim` - Get all movies
- `GET /api/v1/movies/lay-danh-sach-phim-phan-trang` - Get movies with pagination
- `GET /api/v1/movies/lay-danh-sach-phim-theo-ngay` - Get movies by date range
- `GET /api/v1/movies/lay-thong-tin-phim` - Get movie by ID
- `GET /api/v1/movies/lay-danh-sach-banner` - Get banners
- `POST /api/v1/movies/them-phim-upload-hinh` - Create movie with image
- `POST /api/v1/movies/cap-nhat-phim-upload` - Update movie with image
- `POST /api/v1/movies/upload-hinh-anh` - Upload image
- `DELETE /api/v1/movies/xoa-phim` - Delete movie

### Cinema Management
- `GET /api/v1/cinemas/lay-thong-tin-he-thong-rap` - Get cinema systems
- `GET /api/v1/cinemas/lay-thong-tin-cum-rap-theo-he-thong` - Get cinema clusters
- `GET /api/v1/cinemas/lay-thong-tin-lich-chieu-he-thong-rap` - Get cinema schedules
- `GET /api/v1/cinemas/lay-thong-tin-lich-chieu-phim` - Get movie schedules

### Booking Management
- `GET /api/v1/bookings/lay-danh-sach-phong-ve` - Get seat list
- `POST /api/v1/bookings/dat-ve` - Book tickets
- `POST /api/v1/bookings/tao-lich-chieu` - Create schedule

### Banner Management
- `GET /api/v1/banners/lay-danh-sach-banner` - Get banners

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## File Upload

For endpoints that require file uploads, use `multipart/form-data`:

```
Content-Type: multipart/form-data
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Database Schema

The application uses the following main entities:

- **NguoiDung**: User accounts
- **Phim**: Movies
- **HeThongRap**: Cinema systems
- **CumRap**: Cinema clusters
- **RapPhim**: Theaters
- **LichChieu**: Schedules
- **Ghe**: Seats
- **DatVe**: Bookings
- **Banner**: Promotional banners

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Project Structure

```
src/
├── common/
│   ├── helpers/          # Helper functions
│   ├── middlewares/      # Middleware functions
│   └── constants/        # Application constants
├── controllers/          # Route controllers
├── routers/             # Route definitions
└── services/            # Business logic services
```

## Security Features

- JWT Authentication
- Password hashing with bcrypt
- CORS protection
- Helmet security headers
- Rate limiting
- Input validation
- File upload restrictions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
