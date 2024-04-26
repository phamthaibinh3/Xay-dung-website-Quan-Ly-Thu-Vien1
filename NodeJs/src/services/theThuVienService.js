import db from '../models/index'

let themTheThuVien = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Dữ liệu không được cung cấp'
                });
            } else {
                // Kiểm tra xem mã người dùng có tồn tại trong bảng User không
                let userExist = await db.User.findOne({
                    where: { id: data.maNguoiDung }
                });
                if (!userExist) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mã người dùng không tồn tại trong hệ thống'
                    });
                } else {
                    // Kiểm tra xem mã người dùng đã tồn tại trong bảng TheThuVien chưa
                    let tonTai = await db.TheThuVien.findOne({
                        where: { maNguoiDung: data.maNguoiDung }
                    });
                    if (tonTai) {
                        resolve({
                            errCode: 3,
                            errMessage: 'Người dùng đã có thẻ thư viện trong hệ thống'
                        });
                    } else {
                        // Nếu không tồn tại, thêm mới dữ liệu vào bảng TheThuVien
                        await db.TheThuVien.create({
                            maNguoiDung: data.maNguoiDung,
                            ngayCap: data.ngayCap,
                            ngayHetHan: data.ngayHetHan,
                        });
                        resolve({
                            errCode: 0,
                            errMessage: 'Thêm thẻ thư viện thành công'
                        });
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let layTheThuVien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.TheThuVien.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.User, as: 'nguoiDung' },
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