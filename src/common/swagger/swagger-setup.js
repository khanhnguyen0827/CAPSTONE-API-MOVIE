import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SWAGGER_CONFIG } from '../constant/app.constant.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read custom CSS and JS files
const baseCustomCSS = fs.readFileSync(path.join(__dirname, 'swagger-ui-custom.css'), 'utf8');
const baseCustomJS = fs.readFileSync(path.join(__dirname, 'swagger-ui-custom.js'), 'utf8');

// Build dynamic CSS from env-driven colors
const dynamicCss = `
  :root {
    --swagger-primary: ${SWAGGER_CONFIG.COLORS.PRIMARY};
    --swagger-secondary: ${SWAGGER_CONFIG.COLORS.SECONDARY};
  }
  .swagger-ui .topbar { background: linear-gradient(135deg, var(--swagger-primary) 0%, var(--swagger-secondary) 100%) !important; }
  .swagger-ui .opblock.opblock-get { border-left: 4px solid #2196f3 !important; }
  .swagger-ui .opblock.opblock-post { border-left: 4px solid #4caf50 !important; }
  .swagger-ui .opblock.opblock-put { border-left: 4px solid #ff9800 !important; }
  .swagger-ui .opblock.opblock-delete { border-left: 4px solid #f44336 !important; }
`;

const customCSS = `${dynamicCss}\n${baseCustomCSS}`;

// Inject branding config for client-side JS to consume
const brandingBootstrap = `window.__SWAGGER_BRAND=${JSON.stringify({
  title: SWAGGER_CONFIG.TITLE,
  subtitle: SWAGGER_CONFIG.SUBTITLE,
  version: SWAGGER_CONFIG.VERSION,
  logoUrl: SWAGGER_CONFIG.LOGO_URL,
  colors: SWAGGER_CONFIG.COLORS,
})};`;

const customJS = `${brandingBootstrap}\n${baseCustomJS}`;

// Swagger UI configuration
const swaggerUIOptions = {
  customCss: customCSS,
  customSiteTitle: `${SWAGGER_CONFIG.TITLE} Documentation`,
  customfavIcon: SWAGGER_CONFIG.FAVICON_URL || '/favicon.ico',
  customJs: customJS,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    docExpansion: SWAGGER_CONFIG.UI.DOC_EXPANSION,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: SWAGGER_CONFIG.UI.TRY_IT_OUT,
    tagsSorter: (a, b) => {
      const order = SWAGGER_CONFIG.UI.TAG_ORDER || [];
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    },
    operationsSorter: SWAGGER_CONFIG.UI.OPERATIONS_SORTER,
    requestInterceptor: (request) => {
      // Add custom headers if needed
      request.headers['X-API-Version'] = SWAGGER_CONFIG.VERSION;
      return request;
    },
    responseInterceptor: (response) => {
      // Process response if needed
      return response;
    }
  },
  explorer: true,
  customSiteTitle: SWAGGER_CONFIG.TITLE,
  customCssUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
};

export default swaggerUIOptions;
