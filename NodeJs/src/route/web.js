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
import { sendEmailController } from '../controller/mailController';

import db from '../models/index';
import axios from 'axios';
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment');

const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
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
    router.get('/api/qua-ly-khach-hang', userController.quanLyKhachHang);

    router.post('/api/quen-mat-khau', sendEmailController);


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
    router.post('/api/lay-danh-muc-theo-data', bookController.layDanhMucTheoData)
    router.get('/api/get-book-new', bookController.getBookNew)
    router.get('/api/get-book-id', bookController.getBookId);
    router.get('/api/get-book-outstanding', bookController.getBookOutstanding);
    router.get('/api/get-all-book-outstanding', bookController.getAllBookOutstanding);
    router.get('/api/get-all-book-tai-lieu-moi', bookController.getAllTaiLieuMoiNhat);
    router.get('/api/all-sach', bookController.allSach)

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
    router.get('/api/get-thanh-toan', hoaDonController.layHoaDon)
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


    // router.post("/payment", async (req, res) => {
    //     //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //     //parameters
    //     var accessKey = 'F8BBA842ECF85';
    //     var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    //     var orderInfo = 'pay with MoMo';
    //     var partnerCode = 'MOMO';
    //     var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    //     var ipnUrl = 'https://e77e-42-114-171-32.ngrok-free.app/callback';
    //     var requestType = "payWithMethod";
    //     var amount = '50000';
    //     var orderId = partnerCode + new Date().getTime();
    //     var requestId = orderId;
    //     var extraData = '';
    //     var orderGroupId = '';
    //     var autoCapture = true;
    //     var lang = 'vi';

    //     //before sign HMAC SHA256 with format
    //     //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    //     var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //     //puts raw signature
    //     console.log("--------------------RAW SIGNATURE----------------")
    //     console.log(rawSignature)
    //     //signature
    //     const crypto = require('crypto');
    //     var signature = crypto.createHmac('sha256', secretKey)
    //         .update(rawSignature)
    //         .digest('hex');
    //     console.log("--------------------SIGNATURE----------------")
    //     console.log(signature)

    //     //json object send to MoMo endpoint
    //     const requestBody = JSON.stringify({
    //         partnerCode: partnerCode,
    //         partnerName: "Test",
    //         storeId: "MomoTestStore",
    //         requestId: requestId,
    //         amount: amount,
    //         orderId: orderId,
    //         orderInfo: orderInfo,
    //         redirectUrl: redirectUrl,
    //         ipnUrl: ipnUrl,
    //         lang: lang,
    //         requestType: requestType,
    //         autoCapture: autoCapture,
    //         extraData: extraData,
    //         orderGroupId: orderGroupId,
    //         signature: signature
    //     });
    //     const options = {
    //         method: "POST",
    //         url: "https://test-payment.momo.vn/v2/gateway/api/create",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Content-Length': Buffer.byteLength(requestBody)
    //         },
    //         data: requestBody
    //     }
    //     let result;
    //     try {
    //         result = await axios(options);
    //         return res.status(200).json(result.data);
    //     } catch (e) {
    //         return res.status(500).json({
    //             errCode: -1,
    //             errMessage: 'Lỗi Server'
    //         });
    //     }
    // });

    // router.post('/callback',async (req,res) => {
    //     console.log('cacll back:: ');
    //     console.log(req.body);

    //     return res.status(200).json(req.body)
    // })

    // router.post('/payment', async (req, res) => {
    //     const embed_data = {
    //         redirecturl: 'http://localhost:3000/home'
    //     };

    //     const { gia } = req.body;
    //     const items = [{}];
    //     const transID = Math.floor(Math.random() * 1000000);

    //     const order = {
    //         app_id: config.app_id,
    //         app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    //         app_user: "user123",
    //         app_time: Date.now(), // milliseconds
    //         item: JSON.stringify(items),
    //         embed_data: JSON.stringify(embed_data),
    //         amount: gia,
    //         description: `Lazada - Payment for the order #${transID}`,
    //         bank_code: "",
    //         callback_url: "https://c670-2001-ee1-db03-4b70-9536-d30f-1386-adb9.ngrok-free.app/callback"
    //     };

    //     const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    //     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    //     // Log thông tin chi tiết về MAC
    //     console.log("Order data for MAC generation:", data);
    //     console.log("Generated MAC:", order.mac);

    //     try {
    //         const result = await axios.post(config.endpoint, null, { params: order });

    //         // Trích xuất thông tin từ kết quả thanh toán
    //         const hoaDonData = {
    //             maSach: req.body.maSach, // Thay 123 bằng mã sách tương ứng
    //             maNguoiDung: req.body.maNguoiDung, // Thay 456 bằng mã người dùng tương ứng
    //             gia: order.amount,
    //         };

    //         // Thêm dữ liệu vào bảng HoaDon sử dụng Sequelize
    //         const newHoaDon = await db.HoaDon.create(hoaDonData);

    //         console.log("Dữ liệu hóa đơn đã được thêm vào bảng HoaDon:", newHoaDon.toJSON());

    //         // Trả về kết quả cho client
    //         return res.status(200).json(result.data);
    //     } catch (error) {
    //         console.log("Error:", error);
    //         return res.status(500).json({
    //             errCode: -1,
    //             errMessage: 'Lỗi Server'
    //         });
    //     }
    // });


    // router.post('/payment', async (req, res) => {
    //     const embed_data = {
    //         redirecturl: 'http://localhost:3000/home'
    //     };

    //     try {
    //         // Lấy danh sách tất cả các hóa đơn tạm thời của người dùng
    //         const userId = req.body.maNguoiDung;
    //         const gioHangItems = await db.HoaDonTT.findAll({
    //             where: { maNguoiDung: userId }
    //         });

    //         if (gioHangItems.length === 0) {
    //             return res.status(400).json({
    //                 errCode: 1,
    //                 errMessage: 'Giỏ hàng trống',
    //             });
    //         }

    //         // Tính tổng tiền của tất cả các hóa đơn tạm thời
    //         const tongTien = gioHangItems.reduce((total, item) => {
    //             return total + item.gia;
    //         }, 0);

    //         // Tạo hóa đơn chính
    //         const transID = Math.floor(Math.random() * 1000000);
    //         const items = gioHangItems.map(item => ({
    //             maSach: item.maSach,
    //             gia: item.gia
    //         }));

    //         const order = {
    //             app_id: config.app_id,
    //             app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    //             app_user: "user123",
    //             app_time: Date.now(), // milliseconds
    //             item: JSON.stringify(items),
    //             embed_data: JSON.stringify(embed_data),
    //             amount: tongTien,
    //             description: `Thanh toán cho đơn hàng #${transID}`,
    //             bank_code: "",
    //             callback_url: "https://your-callback-url.com/callback"
    //         };

    //         const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    //         order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    //         // Log thông tin chi tiết về MAC
    //         console.log("Order data for MAC generation:", data);
    //         console.log("Generated MAC:", order.mac);

    //         const result = await axios.post(config.endpoint, null, { params: order });

    //         // Tạo hóa đơn chính trong cơ sở dữ liệu
    //         const newHoaDon = await db.HoaDon.create({
    //             maNguoiDung: userId,
    //             gia: tongTien,
    //         });

    //         // Tạo các chi tiết hóa đơn chính
    //         for (let item of gioHangItems) {
    //             await db.HoaDon.create({
    //                 maHoaDon: newHoaDon.id,
    //                 maSach: item.maSach,
    //                 gia: item.gia,
    //             });
    //         }

    //         // Xóa tất cả các hóa đơn tạm thời sau khi thanh toán
    //         await db.HoaDonTT.destroy({ where: { maNguoiDung: userId } });

    //         // Trả về kết quả cho client
    //         return res.status(200).json(result.data);
    //     } catch (error) {
    //         console.log("Error:", error);
    //         return res.status(500).json({
    //             errCode: -1,
    //             errMessage: 'Lỗi Server'
    //         });
    //     }
    // });


    router.post('/payment', async (req, res) => {
        const embed_data = {
            redirecturl: 'http://localhost:3000/home'
        };

        try {
            // Lấy danh sách tất cả các hóa đơn tạm thời của người dùng
            const userId = req.body.maNguoiDung;
            const gioHangItems = await db.HoaDonTT.findAll({
                where: { maNguoiDung: userId }
            });

            if (gioHangItems.length === 0) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Giỏ hàng trống',
                });
            }

            // Tính tổng tiền của tất cả các hóa đơn tạm thời
            const tongTien = gioHangItems.reduce((total, item) => {
                return total + item.gia;
            }, 0);

            // Tạo hóa đơn chính
            const transID = Math.floor(Math.random() * 1000000);
            const items = gioHangItems.map(item => ({
                maSach: item.maSach,
                gia: item.gia
            }));

            const order = {
                app_id: config.app_id,
                app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
                app_user: "user123",
                app_time: Date.now(), // milliseconds
                item: JSON.stringify(items),
                embed_data: JSON.stringify(embed_data),
                amount: tongTien,
                description: `Thanh toán cho đơn hàng #${transID}`,
                bank_code: "",
                callback_url: "https://your-callback-url.com/callback"
            };

            const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
            order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

            // Log thông tin chi tiết về MAC
            console.log("Order data for MAC generation:", data);
            console.log("Generated MAC:", order.mac);

            const result = await axios.post(config.endpoint, null, { params: order });

            // Tạo hóa đơn chính trong cơ sở dữ liệu
            // const newHoaDon = await db.HoaDon.create({

            //     maNguoiDung: userId,
            //     gia: tongTien,
            // });

            // Tạo các chi tiết hóa đơn chính
            for (let item of gioHangItems) {
                await db.HoaDon.create({
                    // maHoaDon: newHoaDon.id,
                    maSach: item.maSach,
                    maNguoiDung: userId,
                    gia: item.gia,
                });
            }

            // Xóa tất cả các hóa đơn tạm thời sau khi thanh toán
            await db.HoaDonTT.destroy({ where: { maNguoiDung: userId } });

            // Trả về kết quả cho client
            return res.status(200).json(result.data);
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Lỗi Server'
            });
        }
    });

    router.post('/callback', (req, res) => {
        let result = {};

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            console.log("mac =", mac);

            if (reqMac !== mac) {
                result.return_code = -1;
                result.return_message = "mac not equal";
            } else {
                let dataJson = JSON.parse(dataStr, config.key2);
                console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

                result.return_code = 1;
                result.return_message = "success";
            }
        } catch (ex) {
            result.return_code = 0;
            result.return_message = ex.message;
        }

        res.json(result);
    });

    router.post("order-status/:app_trans_id", async (req, res) => {
        const app_trans_id = req.params.app_trans_id;
        let postData = {
            app_id: config.app_id,
            app_trans_id: app_trans_id, // Input your app_trans_id
        }

        let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


        let postConfig = {
            method: 'post',
            url: config.endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };

        try {
            let result = await axios(postConfig);
            return res.status(200).json(result.data)
        } catch (e) {
            console.log(e);
        }

    })

    return app.use('/', router);
}

module.exports = initWebRoutes;