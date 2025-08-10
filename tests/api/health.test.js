import request from 'supertest';
import app from '../../server.js';
import { HTTP_STATUS } from '../../src/common/constant/app.constant.js';

describe('Health and Basic API Tests', () => {
  describe('Health Check', () => {
    describe('GET /health', () => {
      it('should return 200 and server status', async () => {
        const response = await request(app)
          .get('/health');
        
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.success).toBe(true);
        expect(response.body.status).toBe('OK');
        expect(response.body.message).toBe('Server is running');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('uptime');
        expect(response.body).toHaveProperty('environment');
      });

      it('should return valid timestamp format', async () => {
        const response = await request(app)
          .get('/health');
        
        const timestamp = new Date(response.body.timestamp);
        expect(timestamp.getTime()).toBeGreaterThan(0);
        expect(timestamp).toBeInstanceOf(Date);
      });

      it('should return valid uptime', async () => {
        const response = await request(app)
          .get('/health');
        
        expect(response.body.uptime).toBeGreaterThanOrEqual(0);
        expect(typeof response.body.uptime).toBe('number');
      });

      it('should return valid environment', async () => {
        const response = await request(app)
          .get('/health');
        
        expect(['development', 'production', 'test']).toContain(response.body.environment);
      });
    });
  });

  describe('Swagger Documentation', () => {
    describe('GET /api/v1/docs', () => {
      it('should return 200 and serve Swagger UI', async () => {
        const response = await request(app)
          .get('/api/v1/docs');
        
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.headers['content-type']).toContain('text/html');
        expect(response.text).toContain('swagger-ui');
      });
    });

    describe('GET /api/v1/docs/swagger.json', () => {
      it('should return 200 and valid OpenAPI specification', async () => {
        const response = await request(app)
          .get('/api/v1/docs/swagger.json');
        
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.headers['content-type']).toContain('application/json');
        
        const swaggerSpec = response.body;
        expect(swaggerSpec.openapi).toBe('3.0.0');
        expect(swaggerSpec.info.title).toBe('Movie Ticketing API');
        expect(swaggerSpec.info.version).toBe('1.0.0');
        expect(swaggerSpec.paths).toBeDefined();
        expect(swaggerSpec.components).toBeDefined();
        expect(swaggerSpec.components.securitySchemes).toBeDefined();
        expect(swaggerSpec.components.schemas).toBeDefined();
      });
    });
  });

  describe('Root API', () => {
    describe('GET /', () => {
      it('should return 404 for root path', async () => {
        const response = await request(app)
          .get('/');
        
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });

    describe('GET /api', () => {
      it('should return 404 for api root path', async () => {
        const response = await request(app)
          .get('/api');
        
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });

    describe('GET /api/v1', () => {
      it('should return 404 for api v1 root path', async () => {
        const response = await request(app)
          .get('/api/v1');
        
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });
  });

  describe('Non-existent Endpoints', () => {
    describe('GET /api/v1/nonexistent', () => {
      it('should return 404 for non-existent endpoint', async () => {
        const response = await request(app)
          .get('/api/v1/nonexistent');
        
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });

    describe('POST /api/v1/nonexistent', () => {
      it('should return 404 for non-existent POST endpoint', async () => {
        const response = await request(app)
          .post('/api/v1/nonexistent')
          .send({ test: 'data' });
        
        expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      });
    });
  });
});
