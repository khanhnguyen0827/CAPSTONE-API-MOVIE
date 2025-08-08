# 🌐 Environment Variables Setup Guide

## ✅ **Hướng dẫn cấu hình Environment Variables**

### 📁 **Cấu trúc file:**

```
CAPSTONE-API-MOVIE/
├── .env                    # 🔐 File environment variables (tạo từ env.example)
├── env.example            # 📋 Template cho environment variables
└── src/common/constant/
    └── app.constant.js    # 🏗️ File constants sử dụng dotenv/config
```

### 🔧 **Bước 1: Tạo file .env**

Copy file `env.example` thành `.env`:

```bash
cp env.example .env
```

### 🔧 **Bước 2: Cấu hình Database**

#### **MySQL Database Setup:**

1. **Tạo database:**
```sql
CREATE DATABASE movie_ticketing;
```

2. **Cấu hình DATABASE_URL trong .env:**
```bash
# Format: mysql://username:password@host:port/database_name
DATABASE_URL=mysql://root:password@localhost:3306/movie_ticketing
```

#### **Các biến Database khác:**
```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=movie_ticketing
DB_USER=root
DB_PASSWORD=password
```

### 🔧 **Bước 3: Cấu hình JWT**

```bash
# JWT Configuration
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-here
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-here
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 🔧 **Bước 4: Cấu hình Server**

```bash
# Server Configuration
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:3000
```

### 🔧 **Bước 5: Cấu hình Rate Limiting**

```bash
# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 🔧 **Bước 6: Cấu hình File Upload**

```bash
# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
```

### 🔧 **Bước 7: Cấu hình Optional Services**

#### **Google OAuth (Optional):**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback
```

#### **Email Configuration (Optional):**
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@movieticketing.com
```

### 🏗️ **Cấu trúc Constants trong app.constant.js:**

```javascript
require('dotenv').config();

// Database Configuration
const DATABASE_CONFIG = {
  URL: process.env.DATABASE_URL,
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || 3306,
  NAME: process.env.DB_NAME || 'movie_ticketing',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || ''
};

// JWT Configuration
const JWT_CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'your-access-secret-key',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};

// Server Configuration
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
```

### 🔄 **Luồng hoạt động:**

```
1. .env file
   ↓
2. dotenv/config trong app.constant.js
   ↓
3. process.env variables
   ↓
4. Constants objects
   ↓
5. Sử dụng trong toàn bộ project
```

### 📊 **Database Connection Flow:**

```
1. DATABASE_URL trong .env
   ↓
2. Prisma schema.prisma
   ↓
3. Prisma Client
   ↓
4. Database operations
```

### 🎯 **Lợi ích của cấu trúc này:**

#### **1. 🏗️ Centralized Configuration:**
- ✅ **Single source of truth**: Tất cả configs ở file .env
- ✅ **Environment-based**: Hỗ trợ nhiều môi trường
- ✅ **Secure**: Không commit sensitive data
- ✅ **Flexible**: Dễ dàng thay đổi config

#### **2. 🔧 Easy Management:**
- ✅ **dotenv/config**: Tự động load .env
- ✅ **Default values**: Giá trị mặc định an toàn
- ✅ **Type safety**: Kiểm tra kiểu dữ liệu
- ✅ **Validation**: Validate config values

#### **3. 📚 Developer Experience:**
- ✅ **Clear structure**: Cấu trúc rõ ràng
- ✅ **Easy setup**: Dễ dàng setup
- ✅ **Consistent usage**: Sử dụng nhất quán
- ✅ **Documentation**: Tài liệu đầy đủ

### 🔧 **Cách sử dụng trong code:**

#### **Import Constants:**
```javascript
const { 
  DATABASE_CONFIG, 
  JWT_CONFIG, 
  SERVER_CONFIG 
} = require('../common/constant/app.constant');
```

#### **Sử dụng Database Config:**
```javascript
// Trong Prisma schema
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Trong code
const dbUrl = DATABASE_CONFIG.URL;
```

#### **Sử dụng JWT Config:**
```javascript
const token = jwt.sign(
  payload,
  JWT_CONFIG.ACCESS_TOKEN_SECRET,
  { expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN }
);
```

#### **Sử dụng Server Config:**
```javascript
const PORT = SERVER_CONFIG.PORT;
const API_PREFIX = SERVER_CONFIG.API_PREFIX;
```

### 🚀 **Bước khởi chạy:**

#### **1. Setup Environment:**
```bash
# Copy env.example to .env
cp env.example .env

# Edit .env với config thực tế
nano .env
```

#### **2. Setup Database:**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (nếu có)
npm run prisma:seed
```

#### **3. Start Server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 🔍 **Kiểm tra cấu hình:**

#### **Test Database Connection:**
```bash
# Test Prisma connection
npx prisma db pull
```

#### **Test Server:**
```bash
# Test API endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
```

#### **Test Swagger Documentation:**
```bash
# Open in browser
http://localhost:3000/api/v1/docs
```

### 🛡️ **Security Best Practices:**

#### **1. Environment Variables:**
- ✅ **Never commit .env**: Thêm .env vào .gitignore
- ✅ **Use strong secrets**: Sử dụng secret keys mạnh
- ✅ **Rotate secrets**: Thay đổi secrets định kỳ
- ✅ **Environment separation**: Tách biệt môi trường

#### **2. Database Security:**
- ✅ **Strong passwords**: Mật khẩu database mạnh
- ✅ **Limited access**: Giới hạn quyền truy cập
- ✅ **Connection pooling**: Sử dụng connection pooling
- ✅ **Backup strategy**: Chiến lược backup

#### **3. JWT Security:**
- ✅ **Strong secrets**: Secret keys mạnh
- ✅ **Short expiration**: Thời gian hết hạn ngắn
- ✅ **Refresh tokens**: Sử dụng refresh tokens
- ✅ **Token rotation**: Xoay vòng tokens

### 📋 **Checklist Setup:**

- [ ] Copy `env.example` to `.env`
- [ ] Configure `DATABASE_URL`
- [ ] Set up MySQL database
- [ ] Configure JWT secrets
- [ ] Set server configuration
- [ ] Configure rate limiting
- [ ] Set up file upload config
- [ ] Test database connection
- [ ] Test server startup
- [ ] Test API endpoints
- [ ] Test Swagger documentation

### 🎉 **Kết quả:**

✅ **Environment variables setup hoàn chỉnh**
✅ **Database connection thông qua DATABASE_URL**
✅ **Centralized configuration management**
✅ **Secure environment handling**
✅ **Easy development setup**
✅ **Production-ready configuration**
✅ **Comprehensive documentation**

---

**🌐 Environment setup đã hoàn thành với cấu hình tập trung và kết nối database thông qua DATABASE_URL!**
