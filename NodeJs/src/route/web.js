import express from 'express';
import homeController from '../controller/homeController'
import userController from '../controller/userController'
import staffController from '../controller/staffController'
import bookController from '../controller/bookController'
import luotThichController from '../controller/luotThichController'
import kindOfBookController from '../controller/kindOfBookController'
import phieuMuonController from '../controller/phieuMuonController'
import hoaDonController from '../controller/hoaDonController'
import nhaXuatBanController from '../controller/nhaXuatBanController'
import theThuVienController from '../controller/theThuVienController'

let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllcode);
    router.post('/api/loginFacebook', userController.loginFacebook);
    router.post('/api/doi-mat-khau', userController.doiMatKhau);
    router.get('/api/qua-ly-nhan-vien', userController.quanLyNhanVien)
    router.get('/api/qua-ly-khach-hang', userController.quanLyKhachHang)

    router.get('/api/top-staff-home', staffController.getTopStaffHome);
    router.get('/api/get-all-staff', staffController.getAllStaff);
    router.post('/api/save-infor-staff', staffController.postSaveInfoStaff);
    router.get('/api/get-detail-staff-by-id', staffController.getDetailStaffById);
    router.post('/api/bulk-create-schedule', staffController.bulkCreateSchedule);
    router.get('/api/get-schedule-staff-by-date', staffController.getScheduleByDate);



    //test
    router.get('/api/get-all-book', bookController.getAllBook);
    router.post('/api/create-book', bookController.CreateBook);
    router.delete('/api/delete-book', bookController.deleteBook);
    router.put('/api/update-book', bookController.updateBook);
    router.get('/api/get-all-danh-muc', bookController.getAllDanhMuc);
    router.post('/api/add-danh-muc', bookController.addDanhMuc);
    router.delete('/api/delete-danh-muc', bookController.deleteDanhMuc);
    router.put('/api/update-danh-muc', bookController.updateDanhMuc);
    router.post('/api/lay-danh-muc-theo-data',bookController.layDanhMucTheoData)
    router.get('/api/get-book-new', bookController.getBookNew)
    router.get('/api/get-book-id', bookController.getBookId);
    router.get('/api/get-book-outstanding', bookController.getBookOutstanding);
    router.get('/api/get-all-book-outstanding', bookController.getAllBookOutstanding);
    router.get('/api/get-all-book-tai-lieu-moi', bookController.getAllTaiLieuMoiNhat);

    router.get('/api/get-all-loai-sach', kindOfBookController.getLoaiSach);
    router.post('/api/create-loai-sach', kindOfBookController.createLoaiSach);
    router.delete('/api/delete-loai-sach', kindOfBookController.deleteLoaiSach);
    router.get('/api/get-loai-sach-id', kindOfBookController.getLoaiSachId);
    router.put('/api/update-loai-sach', kindOfBookController.editLoaiSach);

    router.get('/api/get-phieu-muon', phieuMuonController.layPhieuMuon);
    router.post('/api/tao-phieu-muon', phieuMuonController.taoPhieuMuon);
    router.post('/api/duyet-phieu-muon', phieuMuonController.duyetPhieuMuon);
    router.post('/api/huy-phieu-muon', phieuMuonController.huyPhieuMuon);
    router.post('/api/tra-sach', phieuMuonController.traSach);
    router.get('/api/lay-tra-sach', phieuMuonController.layTraSach);
    router.get('/api/lay-thong-ke', phieuMuonController.thongKeSoLuongSachTraTrongThangHienTai);
    router.post('/api/lay-thong-ke-theo-thang', phieuMuonController.thongKeSoLuongSachTraTrongThang);
    router.get('/api/lay-thong-ke-theo-tung-thang', phieuMuonController.thongKeSoLuongSachTraTheoThang);

    
    


    router.post('/api/tao-hoa-don', hoaDonController.taoHoaDon);
    router.get('/api/thanh-toan-hoa-don', hoaDonController.thanhToanHoaDon);

    router.get('/api/lay-hoa-don-tam-thoi', hoaDonController.layHoaDonTT);
    router.post('/api/tao-hoa-don-tam-thoi', hoaDonController.taoHoaDonTT);
    router.delete('/api/xoa-hoa-don-tam-thoi', hoaDonController.xoaHoaDonTamThoi);

    router.post('/api/tao-nha-xuat-ban', nhaXuatBanController.themNhaXuatBan);
    router.get('/api/get-nha-xuat-ban', nhaXuatBanController.layNhaXuatBan);
    router.delete('/api/xoa-nha-xuat-ban', nhaXuatBanController.xoaNhaXuatBan);
    router.put('/api/sua-nha-xuat-ban', nhaXuatBanController.suaNhaXuatBan);

    router.post('/api/tao-the-thu-vien', theThuVienController.themTheThuVien);
    router.get('/api/lay-the-thu-vien', theThuVienController.layTheThuVien);
    router.delete('/api/xoa-the-thu-vien', theThuVienController.xoaTheThuVien);
    router.put('/api/sua-the-thu-vien', theThuVienController.suaTheThuVien);

    router.post('/api/tao-luot-thich', luotThichController.taoLuotThich);
    router.get('/api/get-luot-thich', luotThichController.layLuotThich);



    return app.use('/', router);
}

module.exports = initWebRoutes;