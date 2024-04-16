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
    return new Promise(async(resolve,reject) => {
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

let taoHoaDonTT = async(data) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage: 'Chua co data'
                })
            }else{
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
            }
        } catch (e) {
            reject
        }
    })
}

module.exports = {
    taoHoaDon, layHoaDonTT, taoHoaDonTT
}