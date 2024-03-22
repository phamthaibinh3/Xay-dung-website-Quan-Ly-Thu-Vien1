import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
            if (!inputData.nhanVienId || !inputData.noiDungHTML || !inputData.noiDungMarkdown
                || !inputData.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Tôi chưa nhận thông tin'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        noiDungHTML: inputData.noiDungHTML,
                        noiDungMarkdown: inputData.noiDungMarkdown,
                        moTa: inputData.moTa,
                        nhanVienId: inputData.nhanVienId,
                    })
                } else if (inputData === 'EDIT') {
                    let staffMarkdown = await db.Markdown.findOne({
                        where: { nhanVienId: inputData.nhanVienId },
                        raw: false
                    })
                    if (staffMarkdown) {
                        staffMarkdown.noiDungHTML = inputData.noiDungHTML;
                        staffMarkdown.noiDungMarkdown = inputData.noiDungMarkdown;
                        staffMarkdown.moTa = inputData.moTa;

                        await staffMarkdown.save()
                    }
                }

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

let getDetailStaffById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Bạn chưa truyền id'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['matKhau']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['moTa', 'noiDungHTML', 'noiDungMarkdown'] },
                        { model: db.Allcode, as: 'vaiTroData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.anh) {
                    data.anh = new Buffer(data.anh, 'base64').toString('binary')
                }

                if (!data) {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.nhanVienId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Bạn chưa truyền đủ thông tin',
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxSoLuong = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }

                let existing = await db.LichLam.findAll({
                    where: { nhanVienId: data.nhanVienId, ngay: data.formatedDate },
                    attributes: ['timeType', 'ngay', 'nhanVienId', 'maxSoLuong'],
                    raw: true
                })

                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.ngay = new Date(item.ngay).getTime();
                        return item;
                    })
                }

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.ngay === b.ngay;
                });


                if (toCreate && toCreate.length > 0) {
                    await db.LichLam.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopStaffHome: getTopStaffHome,
    getAllStaff: getAllStaff, postSaveInforSt,
    getDetailStaffById: getDetailStaffById,
    bulkCreateSchedule: bulkCreateSchedule
}