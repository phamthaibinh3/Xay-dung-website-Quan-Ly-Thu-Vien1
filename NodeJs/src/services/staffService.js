import db from '../models/index';

let getTopStaffHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { vaiTro: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['matKhau']
                },
                include: [
                    { model: db.Allcode, as: 'vaiTroData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'gioiTinhData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllStaff = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await db.User.findAll({
                where: { vaiTro: 'R2' },
                attributes: {
                    exclude: ['matKhau', 'anh']
                }
            })
            resolve({
                errCode: 0,
                data: staff
            })
        } catch (e) {
            reject(e);
        }
    })
}

let postSaveInforSt = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.nhanVienId || !inputData.noiDungHTML || !inputData.noiDungMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Tôi chưa nhận thông tin'
                })
            } else {
                await db.Markdown.create({
                    noiDungHTML: inputData.noiDungHTML,
                    noiDungMarkdown: inputData.noiDungMarkdown,
                    moTa: inputData.moTa,
                    nhanVienId: inputData.nhanVienId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Them thanh cong'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopStaffHome: getTopStaffHome,
    getAllStaff: getAllStaff, postSaveInforSt
}