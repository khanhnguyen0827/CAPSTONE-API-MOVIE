import prisma from '../common/prisma/init.prisma.js';

class BannerService {
  async getBanners() {
    try {
      const banners = await prisma.banner.findMany({
        include: {
          Phim: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      return {
        success: true,
        message: 'Lấy danh sách banner thành công',
        data: {
          banners: banners.map(banner => ({
            maBanner: banner.ma_banner,
            maPhim: banner.ma_phim,
            hinhAnh: banner.hinh_anh,
            phim: banner.Phim ? {
              maPhim: banner.Phim.ma_phim,
              tenPhim: banner.Phim.ten_phim,
              trailer: banner.Phim.trailer,
              hinhAnh: banner.Phim.hinh_anh,
              moTa: banner.Phim.mo_ta,
              ngayKhoiChieu: banner.Phim.ngay_khoi_chieu,
              danhGia: banner.Phim.danh_gia,
              hot: banner.Phim.hot,
              dangChieu: banner.Phim.dang_chieu,
              sapChieu: banner.Phim.sap_chieu
            } : null,
            createdAt: banner.created_at,
            updatedAt: banner.updated_at
          }))
        }
      };
    } catch (error) {
      console.error('Get banners error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách banner',
        statusCode: 500
      };
    }
  }
}

export default new BannerService();
