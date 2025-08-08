-- Database schema for Movie Ticketing System
-- Based on ER diagram with 9 entities

-- Create database
CREATE DATABASE IF NOT EXISTS movie_ticketing_system;
USE movie_ticketing_system;

-- 1. Banner table (Bảng quảng cáo)
CREATE TABLE Banner (
    ma_banner INT PRIMARY KEY AUTO_INCREMENT,
    ma_phim INT NOT NULL,
    hinh_anh VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_phim) REFERENCES Phim(ma_phim) ON DELETE CASCADE
);

-- 2. Phim table (Bảng phim)
CREATE TABLE Phim (
    ma_phim INT PRIMARY KEY AUTO_INCREMENT,
    ten_phim VARCHAR(255) NOT NULL,
    trailer VARCHAR(500),
    hinh_anh VARCHAR(500),
    mo_ta TEXT,
    ngay_khoi_chieu DATE,
    danh_gia INT DEFAULT 0,
    hot BOOLEAN DEFAULT FALSE,
    dang_chieu BOOLEAN DEFAULT FALSE,
    sap_chieu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. HeThongRap table (Bảng hệ thống rạp)
CREATE TABLE HeThongRap (
    ma_he_thong_rap INT PRIMARY KEY AUTO_INCREMENT,
    ten_he_thong_rap VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. CumRap table (Bảng cụm rạp)
CREATE TABLE CumRap (
    ma_cum_rap INT PRIMARY KEY AUTO_INCREMENT,
    ten_cum_rap VARCHAR(255) NOT NULL,
    dia_chi VARCHAR(500),
    ma_he_thong_rap INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_he_thong_rap) REFERENCES HeThongRap(ma_he_thong_rap) ON DELETE CASCADE
);

-- 5. RapPhim table (Bảng rạp phim)
CREATE TABLE RapPhim (
    ma_rap INT PRIMARY KEY AUTO_INCREMENT,
    ten_rap VARCHAR(255) NOT NULL,
    ma_cum_rap INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_cum_rap) REFERENCES CumRap(ma_cum_rap) ON DELETE CASCADE
);

-- 6. NguoiDung table (Bảng người dùng)
CREATE TABLE NguoiDung (
    tai_khoan INT PRIMARY KEY AUTO_INCREMENT,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    so_dt VARCHAR(20),
    mat_khau VARCHAR(255) NOT NULL,
    loai_nguoi_dung VARCHAR(50) DEFAULT 'KhachHang',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. LichChieu table (Bảng lịch chiếu)
CREATE TABLE LichChieu (
    ma_lich_chieu INT PRIMARY KEY AUTO_INCREMENT,
    ma_rap INT NOT NULL,
    ma_phim INT NOT NULL,
    ngay_gio_chieu DATETIME NOT NULL,
    gia_ve DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_rap) REFERENCES RapPhim(ma_rap) ON DELETE CASCADE,
    FOREIGN KEY (ma_phim) REFERENCES Phim(ma_phim) ON DELETE CASCADE
);

-- 8. Ghe table (Bảng ghế)
CREATE TABLE Ghe (
    ma_ghe INT PRIMARY KEY AUTO_INCREMENT,
    ten_ghe VARCHAR(50) NOT NULL,
    loai_ghe VARCHAR(50) DEFAULT 'Thuong',
    ma_rap INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_rap) REFERENCES RapPhim(ma_rap) ON DELETE CASCADE
);

-- 9. DatVe table (Bảng đặt vé)
CREATE TABLE DatVe (
    tai_khoan INT NOT NULL,
    ma_lich_chieu INT NOT NULL,
    ma_ghe INT NOT NULL,
    ngay_dat_ve TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trang_thai VARCHAR(50) DEFAULT 'DaDat',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tai_khoan, ma_lich_chieu, ma_ghe),
    FOREIGN KEY (tai_khoan) REFERENCES NguoiDung(tai_khoan) ON DELETE CASCADE,
    FOREIGN KEY (ma_lich_chieu) REFERENCES LichChieu(ma_lich_chieu) ON DELETE CASCADE,
    FOREIGN KEY (ma_ghe) REFERENCES Ghe(ma_ghe) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_phim_ngay_khoi_chieu ON Phim(ngay_khoi_chieu);
CREATE INDEX idx_phim_dang_chieu ON Phim(dang_chieu);
CREATE INDEX idx_phim_sap_chieu ON Phim(sap_chieu);
CREATE INDEX idx_lich_chieu_ngay_gio ON LichChieu(ngay_gio_chieu);
CREATE INDEX idx_dat_ve_ngay_dat ON DatVe(ngay_dat_ve);
CREATE INDEX idx_nguoi_dung_email ON NguoiDung(email);

-- Insert sample data for testing
-- Insert sample movies
INSERT INTO Phim (ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu) VALUES
('Avengers: Endgame', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'avengers.jpg', 'Biệt đội siêu anh hùng: Hồi kết', '2019-04-26', 9, TRUE, TRUE, FALSE),
('Spider-Man: No Way Home', 'https://www.youtube.com/watch?v=JfVOs4VSpmA', 'spiderman.jpg', 'Người nhện: Không còn nhà', '2021-12-17', 8, TRUE, TRUE, FALSE),
('Black Panther: Wakanda Forever', 'https://www.youtube.com/watch?v=_Z3QKkl1cMc', 'blackpanther.jpg', 'Black Panther: Wakanda bất diệt', '2022-11-11', 7, FALSE, FALSE, TRUE),
('The Batman', 'https://www.youtube.com/watch?v=mqqft2x_Aa4', 'batman.jpg', 'Người Dơi', '2022-03-04', 8, TRUE, TRUE, FALSE),
('Doctor Strange in the Multiverse of Madness', 'https://www.youtube.com/watch?v=aWzlQ2N6qqg', 'doctorstrange.jpg', 'Doctor Strange: Trong đa vũ trụ hỗn loạn', '2022-05-06', 7, FALSE, TRUE, FALSE),
('Thor: Love and Thunder', 'https://www.youtube.com/watch?v=Go8nTmfrQd8', 'thor.jpg', 'Thor: Tình yêu và sấm sét', '2022-07-08', 7, FALSE, TRUE, FALSE),
('Black Adam', 'https://www.youtube.com/watch?v=X0tOpBuYasI', 'blackadam.jpg', 'Black Adam', '2022-10-21', 6, FALSE, FALSE, TRUE),
('Avatar: The Way of Water', 'https://www.youtube.com/watch?v=d9MyW72ELq0', 'avatar.jpg', 'Avatar: Dòng chảy của nước', '2022-12-16', 8, TRUE, TRUE, FALSE),
('Ant-Man and the Wasp: Quantumania', 'https://www.youtube.com/watch?v=ZlNFpri-Y40', 'antman.jpg', 'Ant-Man và Wasp: Vương quốc lượng tử', '2023-02-17', 6, FALSE, FALSE, TRUE),
('Guardians of the Galaxy Vol. 3', 'https://www.youtube.com/watch?v=u3V5KDHRQvk', 'guardians.jpg', 'Vệ binh dải ngân hà 3', '2023-05-05', 8, TRUE, TRUE, FALSE);

-- Insert sample cinema systems
INSERT INTO HeThongRap (ten_he_thong_rap, logo) VALUES
('CGV', 'cgv-logo.png'),
('Lotte Cinema', 'lotte-logo.png'),
('BHD Star', 'bhd-logo.png'),
('Galaxy Cinema', 'galaxy-logo.png'),
('Beta Cinemas', 'beta-logo.png');

-- Insert sample cinema clusters
INSERT INTO CumRap (ten_cum_rap, dia_chi, ma_he_thong_rap) VALUES
('CGV Vincom Center', 'Tầng 4, Vincom Center, 72 Lê Thánh Tôn, Q.1, TP.HCM', 1),
('CGV Aeon Mall', 'Tầng 3, Aeon Mall, 30 Bờ Bao Tân Thắng, Q.1, TP.HCM', 1),
('CGV Crescent Mall', 'Tầng 3, Crescent Mall, 101 Tôn Dật Tiên, Q.7, TP.HCM', 1),
('Lotte Cinema Diamond', 'Tầng 13, Diamond Plaza, 34 Lê Duẩn, Q.1, TP.HCM', 2),
('Lotte Cinema Landmark', 'Tầng B1, Landmark 81, Vinhomes Central Park, Q.1, TP.HCM', 2),
('BHD Star Bitexco', 'Tầng 6, Bitexco Financial Tower, 2 Hải Triều, Q.1, TP.HCM', 3),
('Galaxy Cinema Nguyễn Du', 'Tầng 3, 116 Nguyễn Du, Q.1, TP.HCM', 4),
('Beta Cinemas Thao Dien', 'Tầng 2, Thao Dien Pearl, 12 Quoc Huong, Q.2, TP.HCM', 5);

-- Insert sample cinema halls
INSERT INTO RapPhim (ten_rap, ma_cum_rap) VALUES
('Rạp 1', 1), ('Rạp 2', 1), ('Rạp 3', 1), ('Rạp 4', 1),
('Rạp 1', 2), ('Rạp 2', 2), ('Rạp VIP', 2),
('Rạp 1', 3), ('Rạp 2', 3), ('Rạp IMAX', 3),
('Rạp 1', 4), ('Rạp 2', 4), ('Rạp 3', 4), ('Rạp 4', 4),
('Rạp 1', 5), ('Rạp 2', 5), ('Rạp VIP', 5),
('Rạp 1', 6), ('Rạp 2', 6), ('Rạp 3', 6),
('Rạp 1', 7), ('Rạp 2', 7), ('Rạp 3', 7),
('Rạp 1', 8), ('Rạp 2', 8);

-- Insert sample users
INSERT INTO NguoiDung (ho_ten, email, so_dt, mat_khau, loai_nguoi_dung) VALUES
('Nguyễn Văn A', 'nguyenvana@email.com', '0123456789', '$2b$10$hashedpassword', 'KhachHang'),
('Trần Thị B', 'tranthib@email.com', '0987654321', '$2b$10$hashedpassword', 'KhachHang'),
('Lê Văn C', 'levanc@email.com', '0909090909', '$2b$10$hashedpassword', 'KhachHang'),
('Phạm Thị D', 'phamthid@email.com', '0888888888', '$2b$10$hashedpassword', 'KhachHang'),
('Hoàng Văn E', 'hoangvane@email.com', '0777777777', '$2b$10$hashedpassword', 'KhachHang'),
('Vũ Thị F', 'vuthif@email.com', '0666666666', '$2b$10$hashedpassword', 'KhachHang'),
('Đỗ Văn G', 'dovang@email.com', '0555555555', '$2b$10$hashedpassword', 'KhachHang'),
('Ngô Thị H', 'ngothih@email.com', '0444444444', '$2b$10$hashedpassword', 'KhachHang'),
('Lý Văn I', 'lyvani@email.com', '0333333333', '$2b$10$hashedpassword', 'KhachHang'),
('Admin User', 'admin@email.com', '0909090909', '$2b$10$hashedpassword', 'QuanTri'),
('Manager User', 'manager@email.com', '0808080808', '$2b$10$hashedpassword', 'QuanTri');

-- Insert sample seats for each hall
INSERT INTO Ghe (ten_ghe, loai_ghe, ma_rap) VALUES
-- Rạp 1 (ma_rap = 1)
('A1', 'Thuong', 1), ('A2', 'Thuong', 1), ('A3', 'Thuong', 1), ('A4', 'Thuong', 1), ('A5', 'Thuong', 1),
('B1', 'Thuong', 1), ('B2', 'Thuong', 1), ('B3', 'Thuong', 1), ('B4', 'Thuong', 1), ('B5', 'Thuong', 1),
('C1', 'VIP', 1), ('C2', 'VIP', 1), ('C3', 'VIP', 1), ('C4', 'VIP', 1), ('C5', 'VIP', 1),
-- Rạp 2 (ma_rap = 2)
('A1', 'Thuong', 2), ('A2', 'Thuong', 2), ('A3', 'Thuong', 2), ('A4', 'Thuong', 2), ('A5', 'Thuong', 2),
('B1', 'Thuong', 2), ('B2', 'Thuong', 2), ('B3', 'Thuong', 2), ('B4', 'Thuong', 2), ('B5', 'Thuong', 2),
('C1', 'VIP', 2), ('C2', 'VIP', 2), ('C3', 'VIP', 2), ('C4', 'VIP', 2), ('C5', 'VIP', 2),
-- Rạp 3 (ma_rap = 3)
('A1', 'Thuong', 3), ('A2', 'Thuong', 3), ('A3', 'Thuong', 3), ('A4', 'Thuong', 3), ('A5', 'Thuong', 3),
('B1', 'Thuong', 3), ('B2', 'Thuong', 3), ('B3', 'Thuong', 3), ('B4', 'Thuong', 3), ('B5', 'Thuong', 3),
('C1', 'VIP', 3), ('C2', 'VIP', 3), ('C3', 'VIP', 3), ('C4', 'VIP', 3), ('C5', 'VIP', 3),
-- Rạp 4 (ma_rap = 4)
('A1', 'Thuong', 4), ('A2', 'Thuong', 4), ('A3', 'Thuong', 4), ('A4', 'Thuong', 4), ('A5', 'Thuong', 4),
('B1', 'Thuong', 4), ('B2', 'Thuong', 4), ('B3', 'Thuong', 4), ('B4', 'Thuong', 4), ('B5', 'Thuong', 4),
('C1', 'VIP', 4), ('C2', 'VIP', 4), ('C3', 'VIP', 4), ('C4', 'VIP', 4), ('C5', 'VIP', 4),
-- Rạp 1 (ma_rap = 5)
('A1', 'Thuong', 5), ('A2', 'Thuong', 5), ('A3', 'Thuong', 5), ('A4', 'Thuong', 5), ('A5', 'Thuong', 5),
('B1', 'Thuong', 5), ('B2', 'Thuong', 5), ('B3', 'Thuong', 5), ('B4', 'Thuong', 5), ('B5', 'Thuong', 5),
('C1', 'VIP', 5), ('C2', 'VIP', 5), ('C3', 'VIP', 5), ('C4', 'VIP', 5), ('C5', 'VIP', 5),
-- Rạp 2 (ma_rap = 6)
('A1', 'Thuong', 6), ('A2', 'Thuong', 6), ('A3', 'Thuong', 6), ('A4', 'Thuong', 6), ('A5', 'Thuong', 6),
('B1', 'Thuong', 6), ('B2', 'Thuong', 6), ('B3', 'Thuong', 6), ('B4', 'Thuong', 6), ('B5', 'Thuong', 6),
('C1', 'VIP', 6), ('C2', 'VIP', 6), ('C3', 'VIP', 6), ('C4', 'VIP', 6), ('C5', 'VIP', 6),
-- Rạp VIP (ma_rap = 7)
('A1', 'VIP', 7), ('A2', 'VIP', 7), ('A3', 'VIP', 7), ('A4', 'VIP', 7), ('A5', 'VIP', 7),
('B1', 'VIP', 7), ('B2', 'VIP', 7), ('B3', 'VIP', 7), ('B4', 'VIP', 7), ('B5', 'VIP', 7),
('C1', 'VIP', 7), ('C2', 'VIP', 7), ('C3', 'VIP', 7), ('C4', 'VIP', 7), ('C5', 'VIP', 7);

-- Insert sample showtimes
INSERT INTO LichChieu (ma_rap, ma_phim, ngay_gio_chieu, gia_ve) VALUES
-- Avengers: Endgame
(1, 1, '2024-01-15 19:00:00', 85000),
(1, 1, '2024-01-15 21:30:00', 85000),
(2, 1, '2024-01-15 20:00:00', 90000),
(3, 1, '2024-01-16 19:00:00', 85000),
-- Spider-Man: No Way Home
(4, 2, '2024-01-15 19:30:00', 90000),
(5, 2, '2024-01-15 21:00:00', 90000),
(6, 2, '2024-01-16 20:00:00', 90000),
-- Black Panther: Wakanda Forever
(7, 3, '2024-01-16 19:00:00', 95000),
(8, 3, '2024-01-16 21:30:00', 95000),
-- The Batman
(9, 4, '2024-01-15 18:30:00', 80000),
(10, 4, '2024-01-15 21:00:00', 80000),
(11, 4, '2024-01-16 19:30:00', 80000),
-- Doctor Strange
(12, 5, '2024-01-15 20:00:00', 85000),
(13, 5, '2024-01-16 20:30:00', 85000),
-- Thor: Love and Thunder
(14, 6, '2024-01-15 19:00:00', 85000),
(15, 6, '2024-01-16 21:00:00', 85000),
-- Avatar: The Way of Water
(16, 8, '2024-01-15 18:00:00', 100000),
(17, 8, '2024-01-15 21:30:00', 100000),
(18, 8, '2024-01-16 19:00:00', 100000),
-- Guardians of the Galaxy Vol. 3
(19, 10, '2024-01-15 20:30:00', 90000),
(20, 10, '2024-01-16 20:00:00', 90000);

-- Insert sample bookings


-- Insert sample banners
INSERT INTO Banner (ma_phim, hinh_anh) VALUES
(1, 'banner-avengers-endgame.jpg'),
(2, 'banner-spiderman-nowayhome.jpg'),
(3, 'banner-blackpanther-wakanda.jpg'),
(4, 'banner-batman.jpg'),
(5, 'banner-doctorstrange-multiverse.jpg'),
(6, 'banner-thor-love-thunder.jpg'),
(7, 'banner-black-adam.jpg'),
(8, 'banner-avatar-way-water.jpg'),
(9, 'banner-antman-quantumania.jpg'),
(10, 'banner-guardians-galaxy-3.jpg');


INSERT INTO DatVe (tai_khoan, ma_lich_chieu, ma_ghe, trang_thai) VALUES
-- User 1 bookings (Avengers: Endgame - Rạp 1, Lịch chiếu 1)
(1, 1, 1, 'DaDat'),  -- Ghế A1, Rạp 1
(1, 1, 2, 'DaDat'),  -- Ghế A2, Rạp 1
(1, 1, 6, 'DaDat'),  -- Ghế B1, Rạp 1
-- User 2 bookings (Avengers: Endgame - Rạp 1, Lịch chiếu 2)
(2, 2, 3, 'DaDat'),  -- Ghế A3, Rạp 1
(2, 2, 4, 'DaDat'),  -- Ghế A4, Rạp 1
(2, 2, 7, 'DaDat'),  -- Ghế B2, Rạp 1
-- User 3 bookings (Avengers: Endgame - Rạp 2, Lịch chiếu 3)
(3, 3, 16, 'DaDat'), -- Ghế A1, Rạp 2
(3, 3, 17, 'DaDat'), -- Ghế A2, Rạp 2
(3, 3, 21, 'DaDat'), -- Ghế B1, Rạp 2
-- User 4 bookings (Avengers: Endgame - Rạp 3, Lịch chiếu 4)
(4, 4, 31, 'DaDat'), -- Ghế A1, Rạp 3
(4, 4, 32, 'DaDat'), -- Ghế A2, Rạp 3
(4, 4, 36, 'DaDat'), -- Ghế B1, Rạp 3
-- User 5 bookings (Spider-Man - Rạp 4, Lịch chiếu 5)
(5, 5, 46, 'DaDat'), -- Ghế A1, Rạp 4
(5, 5, 47, 'DaDat'), -- Ghế A2, Rạp 4
(5, 5, 51, 'DaDat'), -- Ghế B1, Rạp 4
-- User 6 bookings (Spider-Man - Rạp 5, Lịch chiếu 6)
(6, 6, 61, 'DaDat'), -- Ghế A1, Rạp 5
(6, 6, 62, 'DaDat'), -- Ghế A2, Rạp 5
(6, 6, 66, 'DaDat'), -- Ghế B1, Rạp 5
-- User 7 bookings (Spider-Man - Rạp 6, Lịch chiếu 7)
(7, 7, 76, 'DaDat'), -- Ghế A1, Rạp 6
(7, 7, 77, 'DaDat'), -- Ghế A2, Rạp 6
(7, 7, 81, 'DaDat'), -- Ghế B1, Rạp 6
-- User 8 bookings (Black Panther - Rạp 7, Lịch chiếu 8)
(8, 8, 91, 'DaDat'), -- Ghế A1, Rạp 7
(8, 8, 92, 'DaDat'), -- Ghế A2, Rạp 7
(8, 8, 96, 'DaDat'), -- Ghế B1, Rạp 7
-- User 9 bookings (Black Panther - Rạp 8, Lịch chiếu 9)
(9, 9, 106, 'DaDat'), -- Ghế A1, Rạp 8
(9, 9, 107, 'DaDat'), -- Ghế A2, Rạp 8
(9, 9, 111, 'DaDat'); -- Ghế B1, Rạp 8
