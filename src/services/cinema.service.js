import prisma from '../common/prisma/init.prisma.js';

class CinemaService {
  async getCinemaSystems() {
    try {
      const cinemaSystems = await prisma.heThongRap.findMany({
        include: {
          CumRap: {
            include: {
              RapPhim: true
            }
          }
        }
      });

      return {
        success: true,
        message: 'Lấy thông tin hệ thống rạp thành công',
        data: {
          heThongRap: cinemaSystems.map(system => ({
            maHeThongRap: system.ma_he_thong_rap,
            tenHeThongRap: system.ten_he_thong_rap,
            logo: system.logo,
            cumRap: system.CumRap.map(cluster => ({
              maCumRap: cluster.ma_cum_rap,
              tenCumRap: cluster.ten_cum_rap,
              diaChi: cluster.dia_chi,
              rapPhim: cluster.RapPhim.map(theater => ({
                maRap: theater.ma_rap,
                tenRap: theater.ten_rap
              }))
            }))
          }))
        }
      };
    } catch (error) {
      console.error('Get cinema systems error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin hệ thống rạp',
        statusCode: 500
      };
    }
  }

  async getCinemaClusters(maHeThongRap) {
    try {
      const cinemaClusters = await prisma.cumRap.findMany({
        where: {
          ma_he_thong_rap: maHeThongRap
        },
        include: {
          RapPhim: true
        }
      });

      return {
        success: true,
        message: 'Lấy thông tin cụm rạp thành công',
        data: {
          cumRap: cinemaClusters.map(cluster => ({
            maCumRap: cluster.ma_cum_rap,
            tenCumRap: cluster.ten_cum_rap,
            diaChi: cluster.dia_chi,
            rapPhim: cluster.RapPhim.map(theater => ({
              maRap: theater.ma_rap,
              tenRap: theater.ten_rap
            }))
          }))
        }
      };
    } catch (error) {
      console.error('Get cinema clusters error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin cụm rạp',
        statusCode: 500
      };
    }
  }

  async getCinemaSchedules(maHeThongRap) {
    try {
      const schedules = await prisma.lichChieu.findMany({
        where: {
          RapPhim: {
            CumRap: {
              ma_he_thong_rap: maHeThongRap
            }
          }
        },
        include: {
          Phim: true,
          RapPhim: {
            include: {
              CumRap: {
                include: {
                  HeThongRap: true
                }
              }
            }
          }
        },
        orderBy: {
          ngay_gio_chieu: 'asc'
        }
      });

      return {
        success: true,
        message: 'Lấy thông tin lịch chiếu hệ thống rạp thành công',
        data: {
          lichChieu: schedules.map(schedule => ({
            maLichChieu: schedule.ma_lich_chieu,
            maRap: schedule.ma_rap,
            maPhim: schedule.ma_phim,
            ngayGioChieu: schedule.ngay_gio_chieu,
            giaVe: schedule.gia_ve,
            phim: {
              maPhim: schedule.Phim.ma_phim,
              tenPhim: schedule.Phim.ten_phim,
              trailer: schedule.Phim.trailer,
              hinhAnh: schedule.Phim.hinh_anh,
              moTa: schedule.Phim.mo_ta,
              ngayKhoiChieu: schedule.Phim.ngay_khoi_chieu,
              danhGia: schedule.Phim.danh_gia,
              hot: schedule.Phim.hot,
              dangChieu: schedule.Phim.dang_chieu,
              sapChieu: schedule.Phim.sap_chieu
            },
            rapPhim: {
              maRap: schedule.RapPhim.ma_rap,
              tenRap: schedule.RapPhim.ten_rap,
              cumRap: {
                maCumRap: schedule.RapPhim.CumRap.ma_cum_rap,
                tenCumRap: schedule.RapPhim.CumRap.ten_cum_rap,
                diaChi: schedule.RapPhim.CumRap.dia_chi,
                heThongRap: {
                  maHeThongRap: schedule.RapPhim.CumRap.HeThongRap.ma_he_thong_rap,
                  tenHeThongRap: schedule.RapPhim.CumRap.HeThongRap.ten_he_thong_rap,
                  logo: schedule.RapPhim.CumRap.HeThongRap.logo
                }
              }
            }
          }))
        }
      };
    } catch (error) {
      console.error('Get cinema schedules error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin lịch chiếu hệ thống rạp',
        statusCode: 500
      };
    }
  }

  async getMovieSchedules(maPhim) {
    try {
      const schedules = await prisma.lichChieu.findMany({
        where: {
          ma_phim: parseInt(maPhim)
        },
        include: {
          Phim: true,
          RapPhim: {
            include: {
              CumRap: {
                include: {
                  HeThongRap: true
                }
              }
            }
          }
        },
        orderBy: {
          ngay_gio_chieu: 'asc'
        }
      });

      return {
        success: true,
        message: 'Lấy thông tin lịch chiếu phim thành công',
        data: {
          lichChieu: schedules.map(schedule => ({
            maLichChieu: schedule.ma_lich_chieu,
            maRap: schedule.ma_rap,
            maPhim: schedule.ma_phim,
            ngayGioChieu: schedule.ngay_gio_chieu,
            giaVe: schedule.gia_ve,
            phim: {
              maPhim: schedule.Phim.ma_phim,
              tenPhim: schedule.Phim.ten_phim,
              trailer: schedule.Phim.trailer,
              hinhAnh: schedule.Phim.hinh_anh,
              moTa: schedule.Phim.mo_ta,
              ngayKhoiChieu: schedule.Phim.ngay_khoi_chieu,
              danhGia: schedule.Phim.danh_gia,
              hot: schedule.Phim.hot,
              dangChieu: schedule.Phim.dang_chieu,
              sapChieu: schedule.Phim.sap_chieu
            },
            rapPhim: {
              maRap: schedule.RapPhim.ma_rap,
              tenRap: schedule.RapPhim.ten_rap,
              cumRap: {
                maCumRap: schedule.RapPhim.CumRap.ma_cum_rap,
                tenCumRap: schedule.RapPhim.CumRap.ten_cum_rap,
                diaChi: schedule.RapPhim.CumRap.dia_chi,
                heThongRap: {
                  maHeThongRap: schedule.RapPhim.CumRap.HeThongRap.ma_he_thong_rap,
                  tenHeThongRap: schedule.RapPhim.CumRap.HeThongRap.ten_he_thong_rap,
                  logo: schedule.RapPhim.CumRap.HeThongRap.logo
                }
              }
            }
          }))
        }
      };
    } catch (error) {
      console.error('Get movie schedules error:', error);
      return {
        success: false,
        message: 'Lỗi lấy thông tin lịch chiếu phim',
        statusCode: 500
      };
    }
  }
}

export default new CinemaService();
