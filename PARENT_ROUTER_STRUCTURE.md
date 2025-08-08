# 🏗️ Parent-Child Router Structure

## ✅ **Cấu trúc Router Cha-Con đã hoàn thành**

### 📁 **Cấu trúc file:**

```
src/routers/
├── root.router.js          # 🏠 Router cha (Parent Router)
├── auth.router.js          # 👤 Router con (Child Router)
├── movie.router.js         # 🎬 Router con (Child Router)
├── cinema.router.js        # 🎭 Router con (Child Router)
├── booking.router.js       # 🎫 Router con (Child Router)
├── user.router.js          # 👥 Router con (Child Router)
└── banner.router.js        # 🖼️ Router con (Child Router)
```

### 🏠 **Router Cha (Parent Router): `root.router.js`**

#### **Chức năng chính:**
- ✅ **Quản lý tất cả router con**: Import và mount tất cả child routers
- ✅ **Centralized routing**: Điểm trung tâm quản lý routing
- ✅ **API prefix management**: Quản lý prefix cho tất cả endpoints
- ✅ **Root endpoints**: Cung cấp các endpoint gốc (health, status, info, ping, docs, api)
- ✅ **404 handling**: Xử lý lỗi 404 cho toàn bộ ứng dụng
- ✅ **Swagger documentation**: Tài liệu cho tất cả modules

#### **Cấu trúc router cha:**

```javascript
// Import child routers
const authRoutes = require('./auth.router');
const movieRoutes = require('./movie.router');
const cinemaRoutes = require('./cinema.router');
const bookingRoutes = require('./booking.router');
const userRoutes = require('./user.router');
const bannerRoutes = require('./banner.router');

// Root endpoints
router.get('/', ...);           // API Information
router.get('/health', ...);     // Health Check
router.get('/status', ...);     // Detailed Status
router.get('/info', ...);       // API Information
router.get('/ping', ...);       // Ping Test
router.get('/docs', ...);       // Documentation Redirect
router.get('/api', ...);        // API Base Info

// Mount child routers
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/movies`, movieRoutes);
router.use(`${API_PREFIX}/cinemas`, cinemaRoutes);
router.use(`${API_PREFIX}/bookings`, bookingRoutes);
router.use(`${API_PREFIX}/users`, userRoutes);
router.use(`${API_PREFIX}/banners`, bannerRoutes);
```

### 👤 **Router Con (Child Routers):**

#### **1. Authentication Router (`auth.router.js`)**
```javascript
// Endpoints: /api/v1/auth/*
- POST /dang-nhap          // Login
- POST /dang-ky            // Register
- GET  /thong-tin-tai-khoan // Get user info
```

#### **2. Movies Router (`movie.router.js`)**
```javascript
// Endpoints: /api/v1/movies/*
- GET    /lay-danh-sach-phim
- GET    /lay-danh-sach-phim-phan-trang
- GET    /lay-danh-sach-phim-theo-ngay
- GET    /lay-thong-tin-phim/{maPhim}
- POST   /them-phim
- PUT    /cap-nhat-phim/{maPhim}
- DELETE /xoa-phim/{maPhim}
- POST   /upload-hinh-anh
```

#### **3. Cinemas Router (`cinema.router.js`)**
```javascript
// Endpoints: /api/v1/cinemas/*
- GET /lay-thong-tin-he-thong-rap
- GET /lay-thong-tin-cum-rap-theo-he-thong/{maHeThongRap}
- GET /lay-thong-tin-lich-chieu-he-thong-rap/{maHeThongRap}
- GET /lay-thong-tin-lich-chieu-phim/{maPhim}
```

#### **4. Bookings Router (`booking.router.js`)**
```javascript
// Endpoints: /api/v1/bookings/*
- GET  /lay-danh-sach-ghe/{maLichChieu}
- POST /dat-ve
- POST /tao-lich-chieu
```

#### **5. Users Router (`user.router.js`)**
```javascript
// Endpoints: /api/v1/users/*
- GET    /lay-danh-sach-nguoi-dung
- GET    /lay-danh-sach-nguoi-dung-phan-trang
- GET    /tim-kiem-nguoi-dung
- GET    /tim-kiem-nguoi-dung-phan-trang
- GET    /lay-danh-sach-loai-nguoi-dung
- GET    /lay-thong-tin-nguoi-dung/{taiKhoan}
- POST   /them-nguoi-dung
- PUT    /cap-nhat-nguoi-dung/{taiKhoan}
- DELETE /xoa-nguoi-dung/{taiKhoan}
```

#### **6. Banners Router (`banner.router.js`)**
```javascript
// Endpoints: /api/v1/banners/*
- GET /lay-danh-sach-banner
```

### 🔄 **Luồng xử lý request:**

```
Client Request
    ↓
server.js (Main App)
    ↓
root.router.js (Parent Router)
    ↓
Child Router (auth/movie/cinema/etc.)
    ↓
Controller
    ↓
Service
    ↓
Database (Prisma)
```

### 🎯 **Lợi ích của cấu trúc Parent-Child:**

#### **1. 🏗️ Centralized Management:**
- ✅ **Single point of control**: Quản lý tất cả routing từ một nơi
- ✅ **Consistent API prefix**: Prefix nhất quán cho tất cả endpoints
- ✅ **Unified error handling**: Xử lý lỗi tập trung
- ✅ **Centralized documentation**: Tài liệu tập trung

#### **2. 🧩 Modular Architecture:**
- ✅ **Separation of concerns**: Tách biệt chức năng rõ ràng
- ✅ **Easy maintenance**: Dễ bảo trì và cập nhật
- ✅ **Scalable structure**: Cấu trúc có thể mở rộng
- ✅ **Reusable components**: Các component có thể tái sử dụng

#### **3. 📚 Better Organization:**
- ✅ **Clear hierarchy**: Cấu trúc phân cấp rõ ràng
- ✅ **Logical grouping**: Nhóm logic theo chức năng
- ✅ **Easy navigation**: Dễ dàng điều hướng
- ✅ **Clean code**: Code sạch và dễ đọc

#### **4. 🔧 Configuration Benefits:**
- ✅ **Environment-based prefix**: Prefix dựa trên environment
- ✅ **Flexible routing**: Routing linh hoạt
- ✅ **Easy testing**: Dễ dàng test từng module
- ✅ **Version control**: Kiểm soát phiên bản tốt hơn

### 📊 **API Structure:**

```
Root Level (Parent Router)
├── /                    # API Information
├── /health             # Health Check
├── /status             # Detailed Status
├── /info               # API Information
├── /ping               # Ping Test
├── /docs               # Documentation Redirect
├── /api                # API Base Info
└── /api/v1/*          # Child Routers
    ├── /auth/*         # Authentication
    ├── /movies/*       # Movie Management
    ├── /cinemas/*      # Cinema Information
    ├── /bookings/*     # Booking Management
    ├── /users/*        # User Management
    └── /banners/*      # Banner Management
```

### 🎨 **Swagger Integration:**

#### **Parent Router Documentation:**
- ✅ **Root endpoints**: Tài liệu cho các endpoint gốc
- ✅ **Module overview**: Tổng quan các module
- ✅ **Schema references**: Tham chiếu schema
- ✅ **Tag organization**: Tổ chức theo tags

#### **Child Router Documentation:**
- ✅ **Module-specific docs**: Tài liệu riêng cho từng module
- ✅ **Detailed endpoints**: Chi tiết từng endpoint
- ✅ **Request/Response schemas**: Schema request/response
- ✅ **Authentication requirements**: Yêu cầu xác thực

### 🔧 **Configuration:**

#### **Environment Variables:**
```javascript
API_PREFIX = '/api/v1'     // API prefix for all child routers
NODE_ENV = 'development'    // Environment
PORT = 3000                // Server port
```

#### **Server Setup:**
```javascript
// server.js
const rootRoutes = require('./src/routers/root.router');

// Mount parent router
app.use('/', rootRoutes);
```

### 🎯 **Tính năng nổi bật:**

#### **1. 🏠 Parent Router Features:**
- ✅ **Centralized routing**: Quản lý routing tập trung
- ✅ **Child router mounting**: Mount tất cả router con
- ✅ **API prefix management**: Quản lý prefix
- ✅ **Root endpoints**: Endpoint gốc
- ✅ **404 handling**: Xử lý lỗi 404
- ✅ **Swagger integration**: Tích hợp Swagger

#### **2. 👤 Child Router Features:**
- ✅ **Module-specific routes**: Route riêng cho từng module
- ✅ **Controller integration**: Tích hợp controller
- ✅ **Middleware support**: Hỗ trợ middleware
- ✅ **Validation**: Validation riêng cho từng module
- ✅ **Error handling**: Xử lý lỗi module-specific

#### **3. 🔄 Request Flow:**
- ✅ **Request routing**: Định tuyến request
- ✅ **Middleware processing**: Xử lý middleware
- ✅ **Controller execution**: Thực thi controller
- ✅ **Service layer**: Tầng service
- ✅ **Database interaction**: Tương tác database
- ✅ **Response formatting**: Định dạng response

### 🎉 **Kết quả:**

✅ **Cấu trúc router cha-con hoàn chỉnh**
✅ **Quản lý routing tập trung**
✅ **Modular architecture**
✅ **Scalable structure**
✅ **Clean code organization**
✅ **Comprehensive documentation**
✅ **Easy maintenance**
✅ **Flexible configuration**

### 🌐 **URL Structure:**

```
Root Level:
- http://localhost:3000/                    # API Info
- http://localhost:3000/health              # Health Check
- http://localhost:3000/status              # Detailed Status
- http://localhost:3000/info                # API Information
- http://localhost:3000/ping                # Ping Test
- http://localhost:3000/docs                # Documentation
- http://localhost:3000/api                 # API Base Info

Child Routers:
- http://localhost:3000/api/v1/auth/*       # Authentication
- http://localhost:3000/api/v1/movies/*     # Movie Management
- http://localhost:3000/api/v1/cinemas/*    # Cinema Information
- http://localhost:3000/api/v1/bookings/*   # Booking Management
- http://localhost:3000/api/v1/users/*      # User Management
- http://localhost:3000/api/v1/banners/*    # Banner Management
```

---

**🏗️ Cấu trúc router cha-con đã được thiết lập thành công với quản lý tập trung và modular architecture!**
