import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read custom CSS and JS files
const customCSS = fs.readFileSync(path.join(__dirname, 'swagger-ui-custom.css'), 'utf8');
const customJS = fs.readFileSync(path.join(__dirname, 'swagger-ui-custom.js'), 'utf8');

// Swagger UI configuration
const swaggerUIOptions = {
  customCss: customCSS,
  customSiteTitle: 'Movie Ticketing API Documentation',
  customfavIcon: '/favicon.ico',
  customJs: customJS,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    docExpansion: 'list',
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    requestInterceptor: (request) => {
      // Add custom headers if needed
      request.headers['X-API-Version'] = '1.0.0';
      return request;
    },
    responseInterceptor: (response) => {
      // Process response if needed
      return response;
    }
  },
  explorer: true,
  customSiteTitle: 'Movie Ticketing API',
  customCssUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
};

export default swaggerUIOptions;
