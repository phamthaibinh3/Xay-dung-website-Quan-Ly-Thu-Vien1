import db from '../models/index'

let themTheThuVien = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua co data'
                })
            } else {
                let tonTai = await db.TheThuVien.findOne({
                    where: { maNguoiDung: data.maNguoiDung },
                })
                if (tonTai) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Nhà xuất bản đã có'
                    })
                } else {
                    await db.TheThuVien.create({
                        maNguoiDung: data.maNguoiDung,
                        ngayCap: data.ngayCap,
                        ngayHetHan: data.ngayHetHan,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: ' thanh cong'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let layTheThuVien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.TheThuVien.findAll({
                order: [['createdAt', 'DESC']],
            });
            resolve({
                errCode: 0,
                data: data,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let xoaTheThuVien = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id',
                })
            } else {
                let res = await db.TheThuVien.findOne({
                    where: { id: idInput },
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong'
                    })
                } else {
                    await db.TheThuVien.destroy({
                        where: { id: idInput }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa thành công'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let suaTheThuVien = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            if (!data) {
                resovle({
                    errCode: 1,
                    errMessage: 'Khong co data'
                })
            } else {
                let nxb = await db.TheThuVien.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (nxb) {
                    nxb.maNguoiDung = data.maNguoiDung;
                    await nxb.save();
                    resovle({
                        errCode: 0,
                        errMessage: 'Thanh cong'
                    })
                } else {
                    resovle({
                        errCode: 2,
                        errMessage: 'Nhà xuất bản không tồn tại'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    themTheThuVien, layTheThuVien, xoaTheThuVien, suaTheThuVien
}