import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


try {
    await prisma.$queryRaw`SELECT 1`; // Kiểm tra kết nối bằng một truy vấn đơn giản
    // Nếu truy vấn thành công, kết nối đã được thiết lập
    console.log("Prisma connected successfully");
} catch (error) {
    console.error("Prisma connection failed:", error);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
}   

export default prisma;
// Đảm bảo rằng kết nối được đóng khi ứng dụng kết thúc


 