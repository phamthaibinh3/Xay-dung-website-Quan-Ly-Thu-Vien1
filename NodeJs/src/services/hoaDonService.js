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

let layHoaDonTT = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.HoaDonTT.findAll();
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
                await db.HoaDonTT.create({
                    tieuDe: data.tieuDe,
                    soLuong: data.soLuong,
                    tacGia: data.tacGia,
                    maDanhMuc: data.maDanhMuc,
                    gia: data.gia,
                    anh: data.anh,
                    maLoaiSach: data.loaiSach,
                    moTa: data.moTa
                })
                resolve({
                    errCode: 0,
                    errMessage: 'thanh cong'
                })
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

module.exports = {
    taoHoaDon, layHoaDonTT, taoHoaDonTT,
    xoaHoaDonTamThoi
}