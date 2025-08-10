// Test setup file
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config({ path: path.join(__dirname, '..', '.env') });

// Set test-specific environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001'; // Use different port for tests
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
process.env.JWT_SECRET = 'test-secret-key';
process.env.CYBERSOFT_TOKEN = 'test-cybersoft-token';

console.log('🧪 Test environment configured');
console.log(`📡 Test port: ${process.env.PORT}`);
console.log(`🗄️  Test database: ${process.env.DATABASE_URL}`);
console.log(`🔑 Test JWT secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
console.log(`🎫 Test Cybersoft token: ${process.env.CYBERSOFT_TOKEN ? 'Set' : 'Not set'}`);

// Global test setup
beforeAll(async () => {
  // Setup test database or mock data if needed
  console.log('🧪 Setting up test environment...');
});

afterAll(async () => {
  // Cleanup test data if needed
  console.log('🧹 Cleaning up test environment...');
});

// Global test timeout
jest.setTimeout(10000);

// Suppress console logs during tests unless there's an error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeEach(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});
