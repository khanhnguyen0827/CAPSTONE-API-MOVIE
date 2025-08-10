import request from 'supertest';
import app from '../../server.js';
import { HTTP_STATUS } from '../../src/common/constant/app.constant.js';

describe('Legacy API Tests', () => {
  describe('QuanLyNguoiDung API', () => {
    describe('GET /api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('token');
      });
    });

    describe('POST /api/QuanLyNguoiDung/DangNhap', () => {
      it('should return 400 for missing credentials', async () => {
        const response = await request(app)
          .post('/api/QuanLyNguoiDung/DangNhap')
          .send({});
        
        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.success).toBe(false);
      });

      it('should return 400 for invalid credentials format', async () => {
        const response = await request(app)
          .post('/api/QuanLyNguoiDung/DangNhap')
          .send({
            taiKhoan: 'user123'
            // Missing matKhau
          });
        
        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/QuanLyNguoiDung/DangKy', () => {
      it('should return 400 for missing required fields', async () => {
        const response = await request(app)
          .post('/api/QuanLyNguoiDung/DangKy')
          .send({
            taiKhoan: 'user123',
            matKhau: 'password123'
            // Missing hoTen, email, soDT
          });
        
        expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('QuanLyPhim API', () => {
    describe('GET /api/QuanLyPhim/LayDanhSachPhim', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/QuanLyPhim/LayDanhSachPhim');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/QuanLyPhim/ThemPhim', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .post('/api/QuanLyPhim/ThemPhim')
          .send({
            tenPhim: 'Test Movie',
            trailer: 'https://youtube.com/watch?v=test',
            moTa: 'Test description',
            ngayKhoiChieu: '2024-01-15',
            danhGia: 8,
            hot: true,
            dangChieu: true,
            sapChieu: false
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('PUT /api/QuanLyPhim/CapNhatPhim', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .put('/api/QuanLyPhim/CapNhatPhim')
          .send({
            maPhim: 1,
            tenPhim: 'Updated Movie'
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('DELETE /api/QuanLyPhim/XoaPhim', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .delete('/api/QuanLyPhim/XoaPhim')
          .query({ MaPhim: 1 });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('QuanLyRap API', () => {
    describe('GET /api/QuanLyRap/LayThongTinHeThongRap', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/QuanLyRap/LayThongTinHeThongRap');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/QuanLyRap/LayThongTinCumRapTheoHeThong', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/QuanLyRap/LayThongTinCumRapTheoHeThong')
          .query({ maHeThongRap: 'BHDStar' });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('QuanLyDatVe API', () => {
    describe('POST /api/QuanLyDatVe/DatVe', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .post('/api/QuanLyDatVe/DatVe')
          .send({
            maLichChieu: 1,
            danhSachGhe: [1, 2, 3],
            taiKhoanNguoiDung: 'user123'
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/QuanLyDatVe/LayDanhSachPhongVe', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/QuanLyDatVe/LayDanhSachPhongVe')
          .query({ MaLichChieu: 1 });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });
});
