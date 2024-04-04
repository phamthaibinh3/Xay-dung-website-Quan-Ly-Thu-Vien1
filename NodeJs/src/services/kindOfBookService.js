import db from '../models/index'

let getLoaiSach = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.TheLoaiSach.findAll({
                order: [['createdAt', 'DESC']],
            });
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createLoaiSach = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.maLoaiSach) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua co id'
                })
            } else {
                let tonTai = await db.TheLoaiSach.findOne({
                    where: { id: data.maLoaiSach }
                })
                if (tonTai) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id đã có trong hệ thống'
                    })
                } else {
                    await db.TheLoaiSach.create({
                        id: data.maLoaiSach,
                        tenTheLoai: data.tenLoaiSach,
                        moTa: data.moTa
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Thanh cong'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteLoaiSach = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id de xoa',
                })
            } else {
                let res = await db.TheLoaiSach.findOne({
                    where: { id: inputId }
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong',
                    })
                }

                else {
                    await db.TheLoaiSach.destroy({
                        where: { id: inputId }
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Xoa thanh cong',
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getLoaiSachId = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id'
                })
            } else {
                let loaiSachId = await db.TheLoaiSach.findOne({
                    where: { id: inputId }
                })

                resolve({
                    errCode: 0,
                    data: loaiSachId
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateLoaiSach = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua truyen data'
                })
            } else {
                let update = await db.TheLoaiSach.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (update) {
                    update.tenTheLoai = data.tenLoaiSach;
                    update.moTa = data.moTa;


                    await update.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Thanh cong'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Id k co trong he thong'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getLoaiSach: getLoaiSach,
    createLoaiSach: createLoaiSach,
    deleteLoaiSach: deleteLoaiSach,
    getLoaiSachId: getLoaiSachId,
    updateLoaiSach: updateLoaiSach
}