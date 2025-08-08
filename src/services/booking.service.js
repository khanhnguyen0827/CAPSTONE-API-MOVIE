import prisma from '../common/prisma/init.prisma.js';

class BookingService {
  async getSeatList(maLichChieu) {
    try {
      // Get schedule information
      const schedule = await prisma.lichChieu.findFirst({
        where: {
          ma_lich_chieu: parseInt(maLichChieu)
        },
        include: {
          Phim: true,
          RapPhim: true
        }
      });

      if (!schedule) {
        return {
          success: false,
          message: 'Không tìm thấy lịch chiếu',
          statusCode: 404
        };
      }

      // Get all seats for the theater
      const seats = await prisma.ghe.findMany({
        where: {
          ma_rap: schedule.ma_rap
        },
        orderBy: [
          { hang: 'asc' },
          { so_ghe: 'asc' }
        ]
      });

      // Get booked seats for this schedule
      const bookedSeats = await prisma.datVe.findMany({
        where: {
          ma_lich_chieu: parseInt(maLichChieu)
        },
        select: {
          ma_ghe: true
        }
      });

      const bookedSeatIds = bookedSeats.map(booking => booking.ma_ghe);

      // Mark seats as booked or available
      const seatList = seats.map(seat => ({
        maGhe: seat.ma_ghe,
        tenGhe: seat.ten_ghe,
        hang: seat.hang,
        soGhe: seat.so_ghe,
        loaiGhe: seat.loai_ghe,
        giaGhe: seat.gia_ghe,
        daDat: bookedSeatIds.includes(seat.ma_ghe)
      }));

      return {
        success: true,
        message: 'Lấy danh sách ghế thành công',
        data: {
          thongTinPhim: {
            maPhim: schedule.Phim.ma_phim,
            tenPhim: schedule.Phim.ten_phim,
            hinhAnh: schedule.Phim.hinh_anh,
            ngayChieu: schedule.ngay_gio_chieu,
            gioChieu: schedule.ngay_gio_chieu,
            giaVe: schedule.gia_ve
          },
          danhSachGhe: seatList
        }
      };
    } catch (error) {
      console.error('Get seat list error:', error);
      return {
        success: false,
        message: 'Lỗi lấy danh sách ghế',
        statusCode: 500
      };
    }
  }

  async bookTickets(bookingData) {
    try {
      const { maLichChieu, danhSachVe, taiKhoan } = bookingData;

      // Validate schedule exists
      const schedule = await prisma.lichChieu.findFirst({
        where: {
          ma_lich_chieu: parseInt(maLichChieu)
        }
      });

      if (!schedule) {
        return {
          success: false,
          message: 'Không tìm thấy lịch chiếu',
          statusCode: 404
        };
      }

      // Validate user exists
      const user = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: taiKhoan
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'Không tìm thấy người dùng',
          statusCode: 404
        };
      }

      // Check if seats are available
      const seatIds = danhSachVe.map(ve => ve.maGhe);
      
      const existingBookings = await prisma.datVe.findMany({
        where: {
          ma_lich_chieu: parseInt(maLichChieu),
          ma_ghe: {
            in: seatIds
          }
        }
      });

      if (existingBookings.length > 0) {
        return {
          success: false,
          message: 'Một số ghế đã được đặt',
          statusCode: 400
        };
      }

      // Create bookings
      const bookings = await Promise.all(
        danhSachVe.map(ve => 
          prisma.datVe.create({
            data: {
              ma_lich_chieu: parseInt(maLichChieu),
              ma_ghe: ve.maGhe,
              tai_khoan: taiKhoan,
              gia_ve: ve.giaVe
            }
          })
        )
      );

      return {
        success: true,
        message: 'Đặt vé thành công',
        data: {
          maLichChieu: parseInt(maLichChieu),
          danhSachVe: bookings.map(booking => ({
            maGhe: booking.ma_ghe,
            giaVe: booking.gia_ve
          }))
        }
      };
    } catch (error) {
      console.error('Book tickets error:', error);
      return {
        success: false,
        message: 'Lỗi đặt vé',
        statusCode: 500
      };
    }
  }

  async createSchedule(scheduleData) {
    try {
      const {
        maRap,
        maPhim,
        ngayGioChieu,
        giaVe
      } = scheduleData;

      // Validate theater exists
      const theater = await prisma.rapPhim.findFirst({
        where: {
          ma_rap: parseInt(maRap)
        }
      });

      if (!theater) {
        return {
          success: false,
          message: 'Không tìm thấy rạp phim',
          statusCode: 404
        };
      }

      // Validate movie exists
      const movie = await prisma.phim.findFirst({
        where: {
          ma_phim: parseInt(maPhim)
        }
      });

      if (!movie) {
        return {
          success: false,
          message: 'Không tìm thấy phim',
          statusCode: 404
        };
      }

      // Check if schedule already exists for this theater and time
      const existingSchedule = await prisma.lichChieu.findFirst({
        where: {
          ma_rap: parseInt(maRap),
          ngay_gio_chieu: new Date(ngayGioChieu)
        }
      });

      if (existingSchedule) {
        return {
          success: false,
          message: 'Lịch chiếu đã tồn tại cho thời gian này',
          statusCode: 400
        };
      }

      // Create new schedule
      const newSchedule = await prisma.lichChieu.create({
        data: {
          ma_rap: parseInt(maRap),
          ma_phim: parseInt(maPhim),
          ngay_gio_chieu: new Date(ngayGioChieu),
          gia_ve: parseFloat(giaVe)
        },
        include: {
          Phim: true,
          RapPhim: true
        }
      });

      return {
        success: true,
        message: 'Tạo lịch chiếu thành công',
        data: {
          maLichChieu: newSchedule.ma_lich_chieu,
          maRap: newSchedule.ma_rap,
          maPhim: newSchedule.ma_phim,
          ngayGioChieu: newSchedule.ngay_gio_chieu,
          giaVe: newSchedule.gia_ve,
          phim: {
            maPhim: newSchedule.Phim.ma_phim,
            tenPhim: newSchedule.Phim.ten_phim,
            trailer: newSchedule.Phim.trailer,
            hinhAnh: newSchedule.Phim.hinh_anh,
            moTa: newSchedule.Phim.mo_ta,
            ngayKhoiChieu: newSchedule.Phim.ngay_khoi_chieu,
            danhGia: newSchedule.Phim.danh_gia,
            hot: newSchedule.Phim.hot,
            dangChieu: newSchedule.Phim.dang_chieu,
            sapChieu: newSchedule.Phim.sap_chieu
          },
          rapPhim: {
            maRap: newSchedule.RapPhim.ma_rap,
            tenRap: newSchedule.RapPhim.ten_rap
          }
        }
      };
    } catch (error) {
      console.error('Create schedule error:', error);
      return {
        success: false,
        message: 'Lỗi tạo lịch chiếu',
        statusCode: 500
      };
    }
  }
}

export default new BookingService();
