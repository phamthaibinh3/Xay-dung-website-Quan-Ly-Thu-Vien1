import db from '../models/index';
import bcrypt from 'bcryptjs'

let getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Sach.findAll();
            resolve({
                errCode:0,
                data: data,
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBook: getAllBook
}