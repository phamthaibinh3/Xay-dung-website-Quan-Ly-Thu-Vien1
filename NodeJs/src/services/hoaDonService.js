import db from '../models/index';

let taoHoaDon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua co data'
                })
            } else {
                await db.HoaDon.create({
                    maSach: data.idSach,
                    maNguoiDung: data.idUser,
                    gia: data.gia
                })
                await xoaTatCaHoaDonTT();
                resolve({
                    errCode: 0,
                    errMessage: 'Thanh cong'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let layHoaDon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
           let data = await db.HoaDon.findAll({
               include: [
                   { model: db.Sach, as: 'Sach', attributes: ['anh'] },
                   { model: db.User, as: 'NguoiDung', attributes: ['anh'] }
               ],
               raw:true,
               nest:false
           })
           resolve({
            errCode:0,
            data: data
           })
        } catch (e) {
            reject(e)
        }
    })
}

let xoaTatCaHoaDonTT = async () => {
    try {
        await db.HoaDonTT.destroy({
            where: {},
            truncate: true
        });

        return {
            errCode: 0,
            errMessage: 'Xóa tất cả hóa đơn thành công'
        };
    } catch (error) {
        return {
            errCode: 1,
            errMessage: 'Lỗi khi xóa tất cả hóa đơn: ' + error.message
        };
    }
}

let layHoaDonTT = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.HoaDonTT.findAll({
                include: [
                    { model: db.Sach, as: 'HoaDonTTSach' },
                    { model: db.User, as: 'HoaDonTTUser' }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let taoHoaDonTT = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua co data'
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.maNguoiDung }
                })
                if (!user) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Nguoi dung khong ton tai'
                    })
                } else {
                    let sach = await db.Sach.findOne({
                        where: { id: data.maSach }
                    })
                    if (!sach) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Sach khong ton tai'
                        })
                    } else {
                        await db.HoaDonTT.create({
                            maSach: data.maSach,
                            maNguoiDung: data.maNguoiDung,
                            gia: data.gia
                        })
                        resolve({
                            errCode: 0,
                            errMessage: 'thanh cong'
                        })
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let xoaHoaDonTamThoi = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua co id'
                })
            } else {
                let res = await db.HoaDonTT.findOne({
                    where: { id: inputId },
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong'
                    })
                } else {
                    await db.HoaDonTT.destroy({
                        where: { id: inputId }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa thành công'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let thanhToanHoaDon = async () => {
    try {
        // Lấy danh sách các hóa đơn từ database
        let danhSachHoaDon = await db.HoaDonTT.findAll();

        // Tính tổng giá của các hóa đơn
        let tongGia = 0;
        for (let hoaDon of danhSachHoaDon) {
            tongGia += hoaDon.gia;
        }

        // Cập nhật giá của các hóa đơn thành tổng giá
        // for (let hoaDon of danhSachHoaDon) {
        //     // Cập nhật giá của hóa đơn thành tổng giá
        //     await hoaDon.update({ gia: tongGia });
        // }

        return {
            errCode: 0,
            data: tongGia
        };
    } catch (error) {
        return {
            errCode: 1,
            errMessage: 'Lỗi khi thanh toán hóa đơn: ' + error.message
        };
    }
}



module.exports = {
    taoHoaDon, layHoaDonTT, taoHoaDonTT,
    xoaHoaDonTamThoi, thanhToanHoaDon, layHoaDon
}