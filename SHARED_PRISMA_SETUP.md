# 🗄️ Shared Prisma Instance Setup

## ✅ **Hoàn thành cấu hình Shared Prisma Instance**

### 📁 **Cấu trúc file:**

```
src/common/prisma/
└── init.prisma.js          # 🏗️ Shared Prisma instance
```

### 🏗️ **Shared Prisma Instance Structure:**

#### **File: `src/common/prisma/init.prisma.js`**
```javascript
const { PrismaClient } = require('@prisma/client');
const { DATABASE_CONFIG } = require('../constant/app.constant');

// Create a single Prisma instance to be shared across the application
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_CONFIG.URL
    }
  }
});

// Test database connection
async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Prisma connected successfully to database');
    console.log(`📊 Database URL: ${DATABASE_CONFIG.URL}`);
    console.log(`🏠 Database Host: ${DATABASE_CONFIG.HOST}`);
    console.log(`🔢 Database Port: ${DATABASE_CONFIG.PORT}`);
    console.log(`📚 Database Name: ${DATABASE_CONFIG.NAME}`);
  } catch (error) {
    console.error('❌ Prisma connection failed:', error);
    console.error('🔧 Please check your DATABASE_URL configuration');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing Prisma connection...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Closing Prisma connection...');
  await prisma.$disconnect();
  process.exit(0);
});

// Test connection on module load
testConnection();

module.exports = prisma;
```

### 🔄 **Luồng hoạt động:**

```
1. DATABASE_CONFIG từ app.constant.js
   ↓
2. init.prisma.js tạo Prisma instance
   ↓
3. Test connection và log thông tin
   ↓
4. Export shared instance
   ↓
5. Import và sử dụng trong tất cả services
```

### 🔧 **Files đã được cập nhật:**

#### **1. `src/common/prisma/init.prisma.js`:**
- ✅ **Chuyển từ ES6 modules sang CommonJS**
- ✅ **Import DATABASE_CONFIG từ constants**
- ✅ **Tạo shared Prisma instance với config**
- ✅ **Test connection với detailed logging**
- ✅ **Graceful shutdown handlers**
- ✅ **Export shared instance**

#### **2. `src/services/auth.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

#### **3. `src/services/movie.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

#### **4. `src/services/cinema.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

#### **5. `src/services/booking.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

#### **6. `src/services/user.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

#### **7. `src/services/banner.service.js`:**
- ✅ **Import shared Prisma instance**
- ✅ **Loại bỏ local PrismaClient**
- ✅ **Sử dụng shared instance**

### 🎯 **Lợi ích của Shared Prisma Instance:**

#### **1. 🏗️ Resource Management:**
- ✅ **Single connection pool**: Một pool connection duy nhất
- ✅ **Memory efficiency**: Tiết kiệm memory
- ✅ **Connection pooling**: Tối ưu connection pooling
- ✅ **Resource sharing**: Chia sẻ tài nguyên

#### **2. 🔧 Performance Benefits:**
- ✅ **Reduced overhead**: Giảm overhead khởi tạo
- ✅ **Faster queries**: Query nhanh hơn
- ✅ **Connection reuse**: Tái sử dụng connection
- ✅ **Optimized pooling**: Pool tối ưu

#### **3. 📚 Developer Experience:**
- ✅ **Centralized config**: Cấu hình tập trung
- ✅ **Easy maintenance**: Dễ bảo trì
- ✅ **Consistent usage**: Sử dụng nhất quán
- ✅ **Better error handling**: Xử lý lỗi tốt hơn

### 🔧 **Cách sử dụng trong Services:**

#### **Import Shared Instance:**
```javascript
const prisma = require('../common/prisma/init.prisma');
```

#### **Sử dụng trong Service Methods:**
```javascript
class MovieService {
  async getAllMovies() {
    try {
      const movies = await prisma.phim.findMany({
        orderBy: {
          created_at: 'desc'
        }
      });
      
      return {
        success: true,
        message: 'Lấy danh sách phim thành công',
        data: { movies }
      };
    } catch (error) {
      console.error('Get all movies error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách phim',
        statusCode: 500
      };
    }
  }
}
```

### 📊 **So sánh trước và sau:**

#### **Trước (Multiple Prisma Instances):**
```javascript
// Mỗi service tạo instance riêng
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// auth.service.js
const prisma = new PrismaClient();

// movie.service.js
const prisma = new PrismaClient();

// cinema.service.js
const prisma = new PrismaClient();
```

#### **Sau (Shared Prisma Instance):**
```javascript
// Một instance duy nhất được chia sẻ
const prisma = require('../common/prisma/init.prisma');

// auth.service.js
const prisma = require('../common/prisma/init.prisma');

// movie.service.js
const prisma = require('../common/prisma/init.prisma');

// cinema.service.js
const prisma = require('../common/prisma/init.prisma');
```

### 🎯 **Tính năng nổi bật:**

#### **1. 🏗️ Connection Management:**
- ✅ **Single instance**: Một instance duy nhất
- ✅ **Connection pooling**: Pool connection tối ưu
- ✅ **Resource sharing**: Chia sẻ tài nguyên
- ✅ **Memory efficiency**: Tiết kiệm memory

#### **2. 🔧 Configuration Benefits:**
- ✅ **Centralized config**: Cấu hình tập trung
- ✅ **Environment-based**: Dựa trên environment
- ✅ **Easy maintenance**: Dễ bảo trì
- ✅ **Consistent usage**: Sử dụng nhất quán

#### **3. 📚 Error Handling:**
- ✅ **Connection testing**: Test connection
- ✅ **Detailed logging**: Log chi tiết
- ✅ **Graceful shutdown**: Tắt ứng dụng an toàn
- ✅ **Error reporting**: Báo cáo lỗi rõ ràng

### 🚀 **Bước khởi chạy:**

#### **1. Setup Database:**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

#### **2. Start Server:**
```bash
# Development mode
npm run dev
```

#### **3. Check Connection:**
```bash
# Server sẽ tự động test connection và log kết quả
✅ Prisma connected successfully to database
📊 Database URL: mysql://root:password@localhost:3306/movie_ticketing
🏠 Database Host: localhost
🔢 Database Port: 3306
📚 Database Name: movie_ticketing
```

### 🔍 **Test Results:**

#### **✅ Connection Test:**
```bash
# Server startup logs
✅ Prisma connected successfully to database
📊 Database URL: mysql://root:password@localhost:3306/movie_ticketing
🏠 Database Host: localhost
🔢 Database Port: 3306
📚 Database Name: movie_ticketing
```

#### **✅ Service Usage:**
```bash
# Tất cả services sử dụng shared instance
curl http://localhost:3000/api/v1/movies/lay-danh-sach-phim
curl http://localhost:3000/api/v1/auth/dang-nhap
curl http://localhost:3000/api/v1/cinemas/lay-thong-tin-he-thong-rap
```

### 📋 **Checklist Implementation:**

- [x] Create `src/common/prisma/init.prisma.js`
- [x] Configure shared Prisma instance
- [x] Import DATABASE_CONFIG from constants
- [x] Add connection testing
- [x] Add graceful shutdown handlers
- [x] Update all service files
- [x] Remove individual PrismaClient instances
- [x] Test connection on startup
- [x] Verify all services work correctly

### 🎉 **Kết quả:**

✅ **Shared Prisma instance hoàn chỉnh**
✅ **Centralized database configuration**
✅ **Optimized connection pooling**
✅ **Memory efficient resource usage**
✅ **Consistent service implementation**
✅ **Better error handling and logging**
✅ **Graceful shutdown management**
✅ **Production-ready database setup**

### 📚 **Documentation Files:**

- ✅ `SHARED_PRISMA_SETUP.md` - Hướng dẫn setup shared Prisma
- ✅ `CONSTANTS_IMPLEMENTATION.md` - Constants implementation
- ✅ `ENV_SETUP_GUIDE.md` - Environment setup guide

---

**🗄️ Shared Prisma instance đã hoàn thành với cấu hình tối ưu và resource management hiệu quả!**
