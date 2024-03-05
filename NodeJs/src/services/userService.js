import db from '../models/index';
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (taiKhoan, matKhau) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let tonTai = await checkTaiKhoan(taiKhoan);
            if (tonTai) {
                let user = await db.User.findOne({
                    where: { taiKhoan: taiKhoan }
                })
                if (user) {
                    let check = await bcrypt.compareSync(matKhau, user.matKhau); // true
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'thanh cong';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Mật khẩu không chính xác';
                    }
                }
            } else {
                userData.errCode = 2;
                userData.message = 'Tài khoản của bạn không có trong hệ thống. Vui lòng thử lại';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkTaiKhoan = (userTaiKhoan) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { taiKhoan: userTaiKhoan }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userId === 'ALL') {
                user = await db.User.findAll({

                })

            }
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    attributes: {
                        exclude: ['matKhau']
                    },
                    where: { id: userId }
                })
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}


let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkTaiKhoan(data.taiKhoan);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "tài khoản đã sử dụng. Vui lòng nhập tài khoản khác"
                })
            }
            else {
                let hashMatKhau = await hashUserPassword(data.matKhau);
                await db.User.create({
                    taiKhoan: data.taiKhoan,
                    matKhau: hashMatKhau,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    dienThoai: data.dienThoai,
                    gioTinh: data.gioiTinh === 1 ? true : false,
                    vaiTro: data.vaiTro
                })
                resolve({
                    errCode: 0,
                    message: "Thêm user thành công"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userss = await db.User.findOne({
                where: { id: userId }
            })
            if (!userss) {
                resolve({
                    errCode: 2,
                    errMessage: 'id khong co trong he thong',
                })
            }

            else {
                await db.User.destroy({
                    where: { id: userId }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Xoa user thanh cong',
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, res) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.hoTen = data.hoTen;
                user.diaChi = data.diaChi;

                await user.save();
                
                resolve({
                    errCode: 0,
                    errMessage: 'Cap nhap thanh cong',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'id khong co trong he thong',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}