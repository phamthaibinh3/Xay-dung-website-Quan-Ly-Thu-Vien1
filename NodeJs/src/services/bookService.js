import { reject } from 'lodash';
import db from '../models/index';
import bcrypt from 'bcryptjs'

let getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll();
            resolve({
                errCode: 0,
                data: data,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let CreateBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chu dien day du thong tin'
                })
            }
            else {
                await db.Sach.create({
                    tieuDe: data.tieuDe,
                    soLuong: data.soLuong,
                    gia: data.gia,
                    tacGia: data.tacGia,
                    maDanhMuc: data.maDanhMuc,
                })



                resolve({
                    errCode: 0,
                    errMessage: 'Thanh cong'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteBook = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id',
                })
            } else {
                let res = await db.Sach.findOne({
                    where: { id: idInput },
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong'
                    })
                } else {
                    await db.Sach.destroy({
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

let updateBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id'
                })
            } else {
                let book = await db.Sach.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (book) {
                    book.tieuDe = data.tieuDe;
                    book.maNXB = data.maNXB;
                    book.namXuatBan = data.namXuatBan;
                    book.soLuong = data.soLuong;
                    book.gia = data.gia;
                    book.tacGia = data.tacGia;

                    await book.save();

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
    getAllBook: getAllBook,
    CreateBook: CreateBook,
    deleteBook: deleteBook,
    updateBook: updateBook
}