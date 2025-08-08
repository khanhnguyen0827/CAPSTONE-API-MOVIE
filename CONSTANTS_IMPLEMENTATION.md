# 🔧 Constants Implementation

## ✅ **Hoàn thành chuyển đổi sang sử dụng Constants**

### 📁 **Cấu trúc Constants:**

```
src/common/constant/
└── app.constant.js          # 🏗️ File constants chính
```

### 🏗️ **Constants Structure:**

#### **1. Database Configuration:**
```javascript
const DATABASE_CONFIG = {
  URL: process.env.DATABASE_URL,
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || 3306,
  NAME: process.env.DB_NAME || 'movie_ticketing',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || ''
};
```

#### **2. JWT Configuration:**
```javascript
const JWT_CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'your-access-secret-key',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};
```

#### **3. Server Configuration:**
```javascript
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
```

#### **4. Rate Limiting Configuration:**
```javascript
const RATE_LIMIT_CONFIG = {
  WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
};
```

#### **5. File Upload Configuration:**
```javascript
const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads'
};
```

#### **6. API Response Messages:**
```javascript
const API_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công',
    REGISTER: 'Đăng ký thành công',
    LOGOUT: 'Đăng xuất thành công',
    CREATE: 'Tạo thành công',
    UPDATE: 'Cập nhật thành công',
    DELETE: 'Xóa thành công',
    FETCH: 'Lấy dữ liệu thành công'
  },
  ERROR: {
    UNAUTHORIZED: 'Không có quyền truy cập',
    FORBIDDEN: 'Truy cập bị từ chối',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    VALIDATION: 'Dữ liệu không hợp lệ',
    SERVER_ERROR: 'Lỗi server',
    DATABASE_ERROR: 'Lỗi cơ sở dữ liệu',
    FILE_UPLOAD_ERROR: 'Lỗi upload file',
    AUTHENTICATION_ERROR: 'Lỗi xác thực'
  }
};
```

#### **7. HTTP Status Codes:**
```javascript
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};
```

#### **8. User Roles:**
```javascript
const USER_ROLES = {
  ADMIN: 'QuanTri',
  CUSTOMER: 'KhachHang'
};
```

#### **9. Movie Status:**
```javascript
const MOVIE_STATUS = {
  NOW_SHOWING: 'dangChieu',
  COMING_SOON: 'sapChieu',
  HOT: 'hot'
};
```

#### **10. Booking Status:**
```javascript
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};
```

#### **11. Seat Types:**
```javascript
const SEAT_TYPES = {
  NORMAL: 'Thuong',
  VIP: 'Vip',
  COUPLE: 'Doi'
};
```

### 🔄 **Files đã được cập nhật:**

#### **1. `src/common/constant/app.constant.js`:**
- ✅ **Chuyển từ ES6 modules sang CommonJS**
- ✅ **Tạo cấu trúc constants hoàn chỉnh**
- ✅ **Tổ chức theo nhóm chức năng**
- ✅ **Default values cho tất cả configs**

#### **2. `server.js`:**
- ✅ **Import constants thay vì dotenv trực tiếp**
- ✅ **Sử dụng SERVER_CONFIG cho port và cors**
- ✅ **Sử dụng RATE_LIMIT_CONFIG cho rate limiting**
- ✅ **Sử dụng UPLOAD_CONFIG cho static files**

#### **3. `src/routers/root.router.js`:**
- ✅ **Import SERVER_CONFIG và API_MESSAGES**
- ✅ **Sử dụng SERVER_CONFIG.API_PREFIX**
- ✅ **Sử dụng SERVER_CONFIG.NODE_ENV**
- ✅ **Consistent configuration usage**

#### **4. `src/services/auth.service.js`:**
- ✅ **Import JWT_CONFIG, API_MESSAGES, HTTP_STATUS**
- ✅ **Sử dụng JWT_CONFIG cho token generation**
- ✅ **Sử dụng API_MESSAGES cho response messages**
- ✅ **Consistent error handling**

### 🎯 **Lợi ích của việc sử dụng Constants:**

#### **1. 🏗️ Centralized Configuration:**
- ✅ **Single source of truth**: Tất cả configs ở một nơi
- ✅ **Easy maintenance**: Dễ dàng bảo trì và cập nhật
- ✅ **Consistent values**: Giá trị nhất quán trong toàn bộ app
- ✅ **Environment-based**: Hỗ trợ nhiều môi trường

#### **2. 🔧 Better Organization:**
- ✅ **Logical grouping**: Nhóm theo chức năng
- ✅ **Clear structure**: Cấu trúc rõ ràng
- ✅ **Easy navigation**: Dễ dàng tìm kiếm
- ✅ **Scalable**: Có thể mở rộng dễ dàng

#### **3. 🛡️ Type Safety:**
- ✅ **Consistent naming**: Tên biến nhất quán
- ✅ **Default values**: Giá trị mặc định an toàn
- ✅ **Validation**: Kiểm tra giá trị
- ✅ **Error prevention**: Ngăn chặn lỗi

#### **4. 📚 Developer Experience:**
- ✅ **IntelliSense support**: Hỗ trợ autocomplete
- ✅ **Easy refactoring**: Dễ dàng refactor
- ✅ **Clear documentation**: Tài liệu rõ ràng
- ✅ **Consistent usage**: Sử dụng nhất quán

### 🔧 **Cách sử dụng Constants:**

#### **Import Constants:**
```javascript
const { 
  SERVER_CONFIG, 
  JWT_CONFIG, 
  API_MESSAGES,
  HTTP_STATUS 
} = require('../common/constant/app.constant');
```

#### **Sử dụng trong Server:**
```javascript
const PORT = SERVER_CONFIG.PORT;
const API_PREFIX = SERVER_CONFIG.API_PREFIX;

app.use(cors({
  origin: SERVER_CONFIG.CORS_ORIGIN,
  credentials: true
}));
```

#### **Sử dụng trong Services:**
```javascript
const token = jwt.sign(
  payload,
  JWT_CONFIG.ACCESS_TOKEN_SECRET,
  { expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN }
);

return {
  success: true,
  message: API_MESSAGES.SUCCESS.LOGIN,
  data: userData
};
```

#### **Sử dụng trong Controllers:**
```javascript
return res.status(HTTP_STATUS.OK).json({
  success: true,
  message: API_MESSAGES.SUCCESS.FETCH,
  data: result
});
```

### 📊 **So sánh trước và sau:**

#### **Trước (sử dụng dotenv trực tiếp):**
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const message = 'Đăng nhập thành công';
```

#### **Sau (sử dụng constants):**
```javascript
const { SERVER_CONFIG, JWT_CONFIG, API_MESSAGES } = require('./constants');

const PORT = SERVER_CONFIG.PORT;
const JWT_SECRET = JWT_CONFIG.ACCESS_TOKEN_SECRET;
const message = API_MESSAGES.SUCCESS.LOGIN;
```

### 🎯 **Tính năng nổi bật:**

#### **1. 🏗️ Configuration Management:**
- ✅ **Centralized configs**: Quản lý tập trung
- ✅ **Environment support**: Hỗ trợ nhiều môi trường
- ✅ **Default values**: Giá trị mặc định an toàn
- ✅ **Type safety**: An toàn về kiểu dữ liệu

#### **2. 🔧 Development Benefits:**
- ✅ **Easy maintenance**: Dễ bảo trì
- ✅ **Consistent usage**: Sử dụng nhất quán
- ✅ **Clear structure**: Cấu trúc rõ ràng
- ✅ **Scalable design**: Thiết kế có thể mở rộng

#### **3. 📚 Code Quality:**
- ✅ **Better organization**: Tổ chức tốt hơn
- ✅ **Reduced duplication**: Giảm lặp lại
- ✅ **Improved readability**: Dễ đọc hơn
- ✅ **Enhanced maintainability**: Dễ bảo trì hơn

### 🎉 **Kết quả:**

✅ **Constants structure hoàn chỉnh**
✅ **Centralized configuration management**
✅ **Consistent usage across all files**
✅ **Better code organization**
✅ **Enhanced maintainability**
✅ **Type safety improvements**
✅ **Developer experience enhancement**
✅ **Scalable architecture**

### 🌐 **Environment Variables Support:**

```bash
# Database
DATABASE_URL=mysql://user:password@localhost:3306/movie_ticketing
DB_HOST=localhost
DB_PORT=3306
DB_NAME=movie_ticketing
DB_USER=root
DB_PASSWORD=password

# JWT
ACCESS_TOKEN_SECRET=your-access-secret-key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
```

---

**🔧 Constants implementation đã hoàn thành với cấu trúc tập trung và quản lý configuration hiệu quả!**
