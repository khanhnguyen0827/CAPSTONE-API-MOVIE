import { PrismaClient } from '@prisma/client';
import { DATABASE_CONFIG } from '../constant/app.constant.js';

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
    await prisma.$queryRaw`SELECT 1`; // Kiểm tra kết nối bằng một truy vấn đơn giản
    console.log('✅ Prisma connected successfully to database');
    console.log(`📊 Database URL: ${DATABASE_CONFIG.URL}`);
    console.log(`🏠 Database Host: ${DATABASE_CONFIG.HOST}`);
    console.log(`🔢 Database Port: ${DATABASE_CONFIG.PORT}`);
    console.log(`📚 Database Name: ${DATABASE_CONFIG.NAME}`);
  } catch (error) {
    console.error('❌ Prisma connection failed:', error);
    console.error('🔧 Please check your DATABASE_URL configuration');
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
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

export default prisma;


 