import request from 'supertest';
import app from '../../server.js';
import { HTTP_STATUS } from '../../src/common/constant/app.constant.js';

describe('Auth API Tests', () => {
  describe('POST /api/v1/auth/dang-nhap', () => {
    it('should return 400 for missing credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-nhap')
        .send({});
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid credentials format', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-nhap')
        .send({
          taiKhoan: 'user123',
          // Missing matKhau
        });
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for empty credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-nhap')
        .send({
          taiKhoan: '',
          matKhau: ''
        });
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/dang-ky', () => {
    it('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-ky')
        .send({
          taiKhoan: 'user123',
          matKhau: 'password123'
          // Missing hoTen, email, soDT
        });
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-ky')
        .send({
          taiKhoan: 'user123',
          matKhau: 'password123',
          hoTen: 'Nguyễn Văn A',
          email: 'invalid-email',
          soDT: '0123456789'
        });
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid phone number format', async () => {
      const response = await request(app)
        .post('/api/v1/auth/dang-ky')
        .send({
          taiKhoan: 'user123',
          matKhau: 'password123',
          hoTen: 'Nguyễn Văn A',
          email: 'user@example.com',
          soDT: '123' // Too short
        });
      
      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/thong-tin', () => {
    it('should return 401 for missing authentication token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/thong-tin');
      
      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
      expect(response.body.success).toBe(false);
    });

    it('should return 401 for invalid authentication token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/thong-tin')
        .set('Authorization', 'Bearer invalid-token');
      
      expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
      expect(response.body.success).toBe(false);
    });
  });
});
