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
            let existingBooks = await db.Sach.findAll({
                where: { tieuDe: data.tieuDe }
            });

            if (existingBooks.length > 0) {
                let existingBook = existingBooks[0]; // Lấy sách đầu tiên trong danh sách
                let updatedQuantity = +existingBook.soLuong + +data.soLuong;// Cộng số lượng mới vào số lượng hiện có
                await db.Sach.update({ soLuong: updatedQuantity }, { where: { tieuDe: data.tieuDe } }); // Lưu lại vào cơ sở dữ liệu
            } else {
                await db.Sach.create({
                    tieuDe: data.tieuDe,
                    maNXB: data.maNXB,
                    namXuatBan: data.namXuatBan,
                    soLuong: data.soLuong,
                    gia: data.gia
                });
            }

            resolve({
                errCode: 0,
                message: 'Thêm thành công'
            });

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBook: getAllBook,
    CreateBook: CreateBook,
}