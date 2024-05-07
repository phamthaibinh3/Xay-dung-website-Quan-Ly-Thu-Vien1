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
                    attributes: ['taiKhoan', 'vaiTro', 'matKhau', 'hoTen', 'id'],
                    where: { taiKhoan: taiKhoan }
                })
                if (user) {
                    let check = await bcrypt.compareSync(matKhau, user.matKhau); // true
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'thanh cong';

                        delete user.matKhau;
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
                    tinhThanh: data.tinhThanh,
                    quanHuyen: data.quanHuyen,
                    phuongXa: data.phuongXa,
                    email: data.email,
                    dienThoai: data.dienThoai,
                    gioiTinh: data.gioiTinh,
                    vaiTro: data.vaiTro,
                    anh: data.avatar
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
            if (!data.id || !data.vaiTro || !data.gioiTinh) {
                resolve({
                    errCode: 2,
                    errMessage: 'Bạn chưa đầy đủ thông tin'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.hoTen = data.hoTen;
                user.diaChi = data.diaChi;
                user.dienThoai = data.dienThoai;
                user.email = data.email;
                user.gioiTinh = data.gioiTinh;
                user.vaiTro = data.vaiTro;
                if (data.avatar) {
                    user.anh = data.avatar;
                }

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

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua truyen type'
                })

            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let loginFacebook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Không có dữ liệu'
                });
            } else {
                let id = ''
                let user = await db.User.findOne({
                    where: { taiKhoan: data.taiKhoan },
                });

                if (!user) {
                    let newUser = await db.User.create({
                        taiKhoan: data.taiKhoan,
                        hoTen: data.ten,
                        anh: data.anh,
                        vaiTro: 'R3'
                    });

                    resolve({
                        errCode: 0,
                        user: newUser,
                        message: 'Đăng nhập thành công',
                    });
                } else {

                    resolve({
                        errCode: 0,
                        user: user,
                        message: 'Đăng nhập thành công'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let doiMatKhau = async (data) => {
    try {
        if (!data) {
            return {
                errCode: 0,
                errMessage: 'Không có dữ liệu'
            };
        }

        const tonTai = await checkTaiKhoan(data.taiKhoan);
        if (!tonTai) {
            return {
                errCode: 1,
                errMessage: 'Tài khoản không tồn tại trong hệ thống'
            };
        }

        const user = await db.User.findOne({
            where: { taiKhoan: data.taiKhoan }
        });

        const isMatch = await bcrypt.compare(data.matKhau, user.matKhau);
        if (!isMatch) {
            return {
                errCode: 2,
                errMessage: 'Mật khẩu hiện tại không chính xác'
            };
        }

        // Mã hóa mật khẩu mới
        const hashNewPassword = await hashUserPassword(data.newPassword);

        await db.User.update({ matKhau: hashNewPassword }, {
            where: { taiKhoan: data.taiKhoan }
        });

        return {
            errCode: 0,
            errMessage: 'Đổi mật khẩu thành công'
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    loginFacebook: loginFacebook,
    getAllCodeService: getAllCodeService,
    doiMatKhau: doiMatKhau
}