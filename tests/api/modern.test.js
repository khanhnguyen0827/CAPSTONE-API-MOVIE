import request from 'supertest';
import app from '../../server.js';
import { HTTP_STATUS } from '../../src/common/constant/app.constant.js';

describe('Modern API Tests', () => {
  describe('Movies API', () => {
    describe('GET /api/v1/movies', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/movies');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/v1/movies', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .post('/api/v1/movies')
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

    describe('GET /api/v1/movies/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/movies/1');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('PUT /api/v1/movies/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .put('/api/v1/movies/1')
          .send({
            tenPhim: 'Updated Movie'
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('DELETE /api/v1/movies/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .delete('/api/v1/movies/1');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('Cinemas API', () => {
    describe('GET /api/v1/cinemas', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/cinemas');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/v1/cinemas/systems', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/cinemas/systems');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/v1/cinemas/clusters', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/cinemas/clusters')
          .query({ maHeThongRap: 'BHDStar' });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('Users API', () => {
    describe('GET /api/v1/users', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/users');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('GET /api/v1/users/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/users/1');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('PUT /api/v1/users/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .put('/api/v1/users/1')
          .send({
            hoTen: 'Updated Name'
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('DELETE /api/v1/users/:id', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .delete('/api/v1/users/1');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('Banners API', () => {
    describe('GET /api/v1/banners', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .get('/api/v1/banners');
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/v1/banners', () => {
      it('should return 401 for missing authentication', async () => {
        const response = await request(app)
          .post('/api/v1/banners')
          .send({
            tenBanner: 'Test Banner',
            hinhAnh: 'banner.jpg',
            moTa: 'Test banner description'
          });
        
        expect(response.status).toBe(HTTP_STATUS.UNAUTHORIZED);
        expect(response.body.success).toBe(false);
      });
    });
  });
});
