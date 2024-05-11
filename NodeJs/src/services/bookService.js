import { reject } from 'lodash';
import db from '../models/index';
import bcrypt from 'bcryptjs'

let getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll({
                include: [
                    {
                        model: db.Allcode,
                        as: 'DanhMucData',
                        attributes: ['valueEn', 'valueVi'], // Chọn các trường bạn muốn lấy từ bảng Allcode
                    }
                ],
                raw: true,
                nest: true
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
                let tonTai = await db.Sach.findOne({
                    where: { tieuDe: data.tieuDe },
                })
                if (tonTai) {
                    await db.Sach.update({ soLuong: +tonTai.soLuong + +data.soLuong }, { where: { tieuDe: data.tieuDe } });
                } else {
                    await db.Sach.create({
                        tieuDe: data.tieuDe,
                        soLuong: data.soLuong,
                        tacGia: data.tacGia,
                        maDanhMuc: data.maDanhMuc,
                        gia: data.gia,
                        anh: data.anh,
                        maLoaiSach: data.loaiSach,
                        moTa: data.moTa,
                        maNXB: data.maNXB,
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
                    book.maDanhMuc = data.maDanhMuc;
                    book.maLoaiSach = data.loaiSach;
                    book.maNXB = data.maNXB;
                    book.moTa = data.moTa;
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

let getAllDanhMuc = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.DanhMuc.findAll({
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

let addDanhMuc = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.maDanhMuc === '' || data.tenDanhMuc === '') {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua nhap data'
                })
            } else {
                let tonTai = await db.DanhMuc.findOne({
                    where: { id: data.maDanhMuc }
                })

                if (tonTai) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mã danh mục đã tồn tại trong hệ thống'
                    })
                } else {
                    await db.DanhMuc.create({
                        id: data.maDanhMuc,
                        tenDanhMuc: data.tenDanhMuc,
                        anh: data.anh
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'thanh cong'
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteDanhMuc = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id de xoa',
                })
            } else {
                let res = await db.DanhMuc.findOne({
                    where: { id: inputId }
                })
                if (!res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'id khong co trong he thong',
                    })
                }

                else {
                    await db.DanhMuc.destroy({
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

let updateDanhMuc = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || data.tenDanhMuc === '') {
                resolve({
                    errCode: 1,
                    errMessage: 'Ban chua truyen id hoặc tên để trống'
                })
            } else {
                let category = await db.DanhMuc.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (category) {
                    category.tenDanhMuc = data.tenDanhMuc;
                    category.anh = data.anh
                    await category.save();

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


let getBookNew = (inputLimit) => {
    return new Promise(async (resovle, reject) => {
        try {
            let book = await db.Sach.findAll({
                limit: inputLimit,
                order: [['createdAt', 'DESC']],
            })

            resovle({
                errCode: 0,
                data: book
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getBookId = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua co id'
                })
            } else {
                let data = await db.Sach.findOne({
                    where: { id: inputId },
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getBookOutstanding = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll({
                order: [['luotThich', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let likeBook = async (idBook) => {
    return new Promise(async (resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}

let getAllBookOutstanding = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll({
                order: [['luotThich', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllTaiLieuMoiNhat = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll({
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBook: getAllBook,
    CreateBook: CreateBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    getAllDanhMuc: getAllDanhMuc,
    addDanhMuc: addDanhMuc,
    deleteDanhMuc: deleteDanhMuc,
    updateDanhMuc: updateDanhMuc,
    getBookNew: getBookNew,
    getBookId: getBookId,
    getBookOutstanding: getBookOutstanding,
    likeBook: likeBook,
    getAllBookOutstanding: getAllBookOutstanding,
    getAllTaiLieuMoiNhat: getAllTaiLieuMoiNhat
}