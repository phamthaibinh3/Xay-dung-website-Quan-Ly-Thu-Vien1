import db from '../models/index';

let layPhieuMuon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.PhieuMuon.findAll();
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let taoPhieuMuon = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Khong co data'
                })
            } else {
                await db.PhieuMuon.create({
                    maNguoiDung: data.idUser,
                    maSach: data.idBook,
                    tinhTrang: data.tinhTrang,
                    ngayTraDuKien: data.ngayTra,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'thanh cong'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    layPhieuMuon, taoPhieuMuon
}