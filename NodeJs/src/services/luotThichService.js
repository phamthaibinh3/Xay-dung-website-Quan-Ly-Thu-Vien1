import { reject } from 'lodash';
import db from '../models/index';

let layLuotThich = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.LuotThich.findAll({
                include: [
                    { model: db.User, as: 'LuotThichUser' },
                    { model: db.Sach, as: 'LuotThichSach' },
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

let createLike = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!item.idUser || !item.idSach) {
                resolve({
                    errCode: 1,
                    errMessage: 'Bạn chưa đăng nhập hoặc sách không tồn tại',

                })
            } else {

                await db.LuotThich.create({
                    maNguoiDung: item.idUser,
                    maSach: item.idSach,
                    trangThai: true
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Thành công'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateLike = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id'
                })
            } else {
                let like = await db.LuotThich.findOne({
                    where: { id: data.id },
                    include: [
                        { model: db.Sach, as: 'LuotThichSach' },
                    ],
                    raw: false,
                    nest: true,
                })
                if (like) {
                    like.trangThai = data.trangThai;
                    await like.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'thanh cong'
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

let trangThai = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = await db.Sach.findOne({
                where: { id: data.id },
                raw: false
            });

            if (!book) {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy sách'
                });
                return;
            }

            let like = await db.LuotThich.findOne({
                where: { trangThai: data.trangThai }
            });

            if (!like) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không tìm thấy lượt thích'
                });
                return;
            }

            if (data.trangThai === 1) {
                book.luotThich -= 1;
            } else {
                book.luotThich += 1;
            }

            await book.save();

            resolve({
                errCode: 0,
                errMessage: 'Thành công'
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getStateLike = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let like = await db.LuotThich.findAll({
                where: { trangThai: 1 },
            })
            resolve({
                errCode: 0,
                data: like
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    layLuotThich: layLuotThich,
    createLike: createLike,
    updateLike: updateLike,
    trangThai: trangThai,
    getStateLike: getStateLike
}