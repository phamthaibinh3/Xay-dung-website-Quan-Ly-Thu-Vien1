import db from '../models/index'

let themNhaXuatBan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'K co data'
                })
            } else {
                let tonTai = await db.NhaXuatBan.findOne({
                    where: { tenNXB: data.tenNXB },
                })
                if (tonTai) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Nhà xuất bản đã có'
                    })
                } else {
                    await db.NhaXuatBan.create({
                        tenNXB: data.tenNXB,
                        diaChi: data.diaChi,
                        SDT: data.SDT,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: ' thanh cong'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let layNhaXuatBan = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.NhaXuatBan.findAll({
                order: [['createdAt', 'DESC']],
            });
            resolve({
                errCode: 0,
                data: data,
            })
        } catch (e) {
            reject(e)
        }
    })
}

let xoaNhaXuatBan = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id',
                })
            } else {
                let res = await db.NhaXuatBan.findOne({
                    where: { id: idInput },
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong'
                    })
                } else {
                    await db.NhaXuatBan.destroy({
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



let suaNhaXuatBan = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            if (!data) {
                resovle({
                    errCode: 1,
                    errMessage: 'Khong co data'
                })
            } else {
                let nxb = await db.NhaXuatBan.findOne({
                    where: { id: data.id },
                    raw: false
                })

                if (nxb) {
                    nxb.tenNXB = data.tenNXB;

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
    themNhaXuatBan, layNhaXuatBan, xoaNhaXuatBan, suaNhaXuatBan
}