# 🚀 Swagger API Documentation Guide

## 📋 Tổng quan

Dự án Movie Ticketing API đã được tích hợp Swagger để cung cấp tài liệu API trực quan và tương tác. Swagger UI cho phép bạn:

- **Xem tài liệu API** chi tiết với các endpoint, parameters, và responses
- **Test API trực tiếp** từ giao diện web
- **Tải xuống OpenAPI specification** để sử dụng với các công cụ khác
- **Xác thực JWT** để test các endpoint yêu cầu authentication

## 🌐 Truy cập Swagger UI

### URL chính:
```
http://localhost:3000/api/v1/docs
```

### Các endpoint khác:
- **Health Check**: `http://localhost:3000/health`
- **Root API**: `http://localhost:3000/`
- **API Base**: `http://localhost:3000/api/v1`

## 🔐 Authentication

### JWT Token
Hầu hết các API yêu cầu JWT token để xác thực. Để sử dụng:

1. **Đăng nhập** để lấy token:
   ```
   POST /api/v1/auth/dang-nhap
   {
     "taiKhoan": "user123",
     "matKhau": "password123"
   }
   ```

2. **Sử dụng token** trong Swagger UI:
   - Click vào nút **"Authorize"** (🔒) ở góc trên bên phải
   - Nhập token theo format: `Bearer YOUR_TOKEN_HERE`
   - Click **"Authorize"**

### Token Format:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 API Categories

### 1. 🔐 Authentication (`/auth`)
- **POST** `/dang-nhap` - Đăng nhập người dùng
- **POST** `/dang-ky` - Đăng ký người dùng mới
- **GET** `/thong-tin-tai-khoan` - Lấy thông tin tài khoản (cần auth)

### 2. 🎬 Movies (`/movies`)
- **GET** `/lay-danh-sach-phim` - Lấy danh sách tất cả phim
- **GET** `/lay-danh-sach-phim-phan-trang` - Lấy danh sách phim phân trang
- **GET** `/lay-danh-sach-phim-theo-ngay` - Lấy phim theo ngày khởi chiếu
- **GET** `/lay-thong-tin-phim/{maPhim}` - Lấy thông tin chi tiết phim
- **POST** `/them-phim` - Thêm phim mới (admin only)
- **PUT** `/cap-nhat-phim/{maPhim}` - Cập nhật phim (admin only)
- **DELETE** `/xoa-phim/{maPhim}` - Xóa phim (admin only)
- **POST** `/upload-hinh-anh` - Upload hình ảnh phim (admin only)

### 3. 🎭 Banners (`/banners`)
- **GET** `/lay-danh-sach-banner` - Lấy danh sách banner

### 4. 🏢 Cinemas (`/cinemas`)
- **GET** `/lay-thong-tin-he-thong-rap` - Lấy thông tin hệ thống rạp
- **GET** `/lay-thong-tin-cum-rap-theo-he-thong/{maHeThongRap}` - Lấy cụm rạp theo hệ thống
- **GET** `/lay-thong-tin-lich-chieu-he-thong-rap/{maHeThongRap}` - Lấy lịch chiếu theo hệ thống
- **GET** `/lay-thong-tin-lich-chieu-phim/{maPhim}` - Lấy lịch chiếu theo phim

### 5. 🎫 Bookings (`/bookings`)
- **GET** `/lay-danh-sach-ghe/{maLichChieu}` - Lấy danh sách ghế theo lịch chiếu
- **POST** `/dat-ve` - Đặt vé xem phim (cần auth)
- **POST** `/tao-lich-chieu` - Tạo lịch chiếu mới (admin only)

### 6. 👥 Users (`/users`)
- **GET** `/lay-danh-sach-nguoi-dung` - Lấy danh sách người dùng (admin only)
- **GET** `/lay-danh-sach-nguoi-dung-phan-trang` - Lấy danh sách người dùng phân trang (admin only)
- **GET** `/tim-kiem-nguoi-dung` - Tìm kiếm người dùng (admin only)
- **GET** `/tim-kiem-nguoi-dung-phan-trang` - Tìm kiếm người dùng phân trang (admin only)
- **GET** `/lay-danh-sach-loai-nguoi-dung` - Lấy danh sách loại người dùng (admin only)
- **GET** `/lay-thong-tin-nguoi-dung/{taiKhoan}` - Lấy thông tin người dùng (admin only)
- **POST** `/them-nguoi-dung` - Thêm người dùng mới (admin only)
- **PUT** `/cap-nhat-nguoi-dung/{taiKhoan}` - Cập nhật thông tin người dùng (admin only)
- **DELETE** `/xoa-nguoi-dung/{taiKhoan}` - Xóa người dùng (admin only)

## 🧪 Test API với Swagger

### Bước 1: Khởi động server
```bash
npm run dev
```

### Bước 2: Truy cập Swagger UI
Mở trình duyệt và truy cập: `http://localhost:3000/api/v1/docs`

### Bước 3: Test Authentication
1. Tìm endpoint **POST** `/auth/dang-nhap`
2. Click **"Try it out"**
3. Nhập thông tin đăng nhập:
   ```json
   {
     "taiKhoan": "user123",
     "matKhau": "password123"
   }
   ```
4. Click **"Execute"**
5. Copy token từ response

### Bước 4: Authorize với JWT
1. Click nút **"Authorize"** (🔒)
2. Nhập: `Bearer YOUR_TOKEN_HERE`
3. Click **"Authorize"**

### Bước 5: Test các API khác
Bây giờ bạn có thể test các API yêu cầu authentication:

- **GET** `/auth/thong-tin-tai-khoan` - Lấy thông tin tài khoản
- **POST** `/bookings/dat-ve` - Đặt vé
- **GET** `/users/lay-danh-sach-nguoi-dung` - Lấy danh sách người dùng (admin)

## 📝 Response Format

Tất cả API đều trả về response theo format chuẩn:

### Success Response:
```json
{
  "success": true,
  "message": "Thành công",
  "data": {
    // Dữ liệu trả về
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Lỗi xảy ra",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 File Upload

Đối với các API upload file (như upload hình ảnh phim):

1. Click **"Try it out"**
2. Sử dụng form data thay vì JSON
3. Upload file qua giao diện file picker
4. Điền các thông tin khác
5. Click **"Execute"**

## 🚨 Common Issues

### 1. CORS Error
- Đảm bảo server đang chạy trên port 3000
- Kiểm tra CORS configuration trong server.js

### 2. Authentication Error
- Đảm bảo token format đúng: `Bearer TOKEN`
- Kiểm tra token có hết hạn không
- Đảm bảo user có quyền truy cập

### 3. Validation Error
- Kiểm tra format dữ liệu gửi lên
- Đảm bảo các field required được điền đầy đủ
- Kiểm tra format email, phone number

## 📊 Database Schema

### Các bảng chính:
- **nguoiDung** - Thông tin người dùng
- **phim** - Thông tin phim
- **banner** - Banner quảng cáo
- **heThongRap** - Hệ thống rạp
- **cumRap** - Cụm rạp
- **rapPhim** - Rạp phim
- **lichChieu** - Lịch chiếu
- **ghe** - Ghế ngồi
- **datVe** - Đặt vé

## 🔗 Useful Links

- **Swagger UI**: `http://localhost:3000/api/v1/docs`
- **Health Check**: `http://localhost:3000/health`
- **API Base**: `http://localhost:3000/api/v1`
- **GitHub Repository**: [Link to your repo]

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra console logs của server
2. Kiểm tra database connection
3. Kiểm tra JWT token
4. Kiểm tra file permissions cho upload

---

**Happy Testing! 🎉**
