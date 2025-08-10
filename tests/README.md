# 🧪 Movie Ticketing API Test Suite

Bộ test comprehensive cho Movie Ticketing API, bao gồm unit tests, integration tests và API endpoint tests.

## 📁 Cấu trúc Test

```
tests/
├── README.md                 # Hướng dẫn này
├── setup.js                  # Setup chung cho Jest
├── run-tests.js             # Test runner chính
└── api/                     # Test files cho API endpoints
    ├── health.test.js       # Health check & basic endpoints
    ├── auth.test.js         # Authentication endpoints
    ├── legacy.test.js       # Legacy API endpoints
    ├── modern.test.js       # Modern API endpoints
    └── integration.test.js  # Integration tests
```

## 🚀 Cách sử dụng

### 1. Chạy tất cả tests
```bash
npm run test:all
# hoặc
node tests/run-tests.js
```

### 2. Chạy test category cụ thể
```bash
# Health tests
npm run test:health

# Auth tests  
npm run test:auth

# Legacy API tests
npm run test:legacy

# Modern API tests
npm run test:modern

# Integration tests
npm run test:integration
```

### 3. Sử dụng Jest trực tiếp
```bash
# Chạy tất cả tests
npm test

# Chạy với watch mode
npm run test:watch

# Chạy với coverage report
npm run test:coverage

# Chạy test file cụ thể
npx jest tests/api/health.test.js
```

### 4. Sử dụng test runner với category
```bash
# Chạy health tests
node tests/run-tests.js --category health

# Chạy auth tests
node tests/run-tests.js --category auth

# Xem help
node tests/run-tests.js --help
```

## 📋 Test Categories

### 🔍 Health Tests (`health.test.js`)
- Health check endpoint (`/health`)
- Swagger documentation endpoints
- Root path handling
- Non-existent endpoint handling

### 🔐 Authentication Tests (`auth.test.js`)
- User registration (`POST /api/v1/auth/dang-ky`)
- User login (`POST /api/v1/auth/dang-nhap`)
- User profile (`GET /api/v1/auth/thong-tin`)
- Input validation
- Error handling

### 🏛️ Legacy API Tests (`legacy.test.js`)
- **QuanLyNguoiDung**: User management endpoints
- **QuanLyPhim**: Movie management endpoints  
- **QuanLyRap**: Cinema management endpoints
- **QuanLyDatVe**: Booking management endpoints
- Authentication requirements
- Input validation

### 🆕 Modern API Tests (`modern.test.js`)
- **Movies API**: CRUD operations
- **Cinemas API**: System & cluster management
- **Users API**: User management
- **Banners API**: Banner management
- Authentication requirements
- Input validation

### 🔗 Integration Tests (`integration.test.js`)
- Complete authentication flow
- Protected endpoint access
- Error handling scenarios
- Payload validation
- Performance testing

## ⚙️ Configuration

### Jest Configuration (`jest.config.js`)
- ES Modules support
- Coverage reporting
- Test timeout settings
- File matching patterns

### Test Setup (`tests/setup.js`)
- Environment variables loading
- Global test configuration
- Console output management
- Test lifecycle hooks

## 📊 Coverage Reports

Sau khi chạy tests với coverage:
```bash
npm run test:coverage
```

Reports sẽ được tạo trong thư mục `coverage/`:
- `coverage/lcov-report/index.html` - HTML coverage report
- `coverage/lcov.info` - LCOV format for CI/CD

## 🐛 Troubleshooting

### Common Issues

1. **Import errors**: Đảm bảo sử dụng ES modules syntax
2. **Timeout errors**: Tăng `testTimeout` trong Jest config
3. **Database connection**: Kiểm tra environment variables
4. **Port conflicts**: Đảm bảo server không chạy khi test

### Debug Mode

Chạy test với verbose output:
```bash
npx jest --verbose
```

### Environment Variables

Tạo file `.env.test` cho test environment:
```env
NODE_ENV=test
PORT=3001
DATABASE_URL=your_test_database_url
JWT_SECRET=test_jwt_secret
```

## 📝 Adding New Tests

### 1. Tạo test file mới
```javascript
import request from 'supertest';
import app from '../../server.js';
import { HTTP_STATUS } from '../../src/common/constant/app.constant.js';

describe('New Feature Tests', () => {
  describe('GET /api/v1/new-feature', () => {
    it('should return 200 for valid request', async () => {
      const response = await request(app)
        .get('/api/v1/new-feature');
      
      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body.success).toBe(true);
    });
  });
});
```

### 2. Thêm vào test runner
Cập nhật `testCategories` array trong `tests/run-tests.js`

### 3. Thêm npm script
Cập nhật `package.json` scripts section

## 🎯 Best Practices

1. **Test Structure**: Sử dụng describe blocks để nhóm tests
2. **Naming**: Đặt tên test rõ ràng và mô tả
3. **Assertions**: Kiểm tra cả status code và response body
4. **Error Cases**: Test cả success và error scenarios
5. **Cleanup**: Sử dụng afterEach/afterAll để cleanup data
6. **Mocking**: Mock external dependencies khi cần thiết

## 📚 Dependencies

- **Jest**: Testing framework
- **Supertest**: HTTP assertion library
- **ES Modules**: Modern JavaScript modules

## 🤝 Contributing

Khi thêm tests mới:
1. Tuân thủ cấu trúc hiện tại
2. Sử dụng consistent naming conventions
3. Thêm comments cho complex test cases
4. Update documentation khi cần thiết
