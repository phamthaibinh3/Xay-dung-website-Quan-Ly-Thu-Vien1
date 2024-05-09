import db from '../models/index';
const moment = require('moment');
let layPhieuMuon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.PhieuMuon.findAll({
                include: [
                    { model: db.Sach, as: 'SachMuon' }
                ],
                raw: false,
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

let taoPhieuMuon = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Khong co data'
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.idUser }
                })
                if (!user) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Id người dùng không đúng'
                    })
                } else {
                    let sach = await db.Sach.findOne({
                        where: { id: data.idBook }
                    })
                    if (!sach) {
                        resolve({
                            errCode: 3,
                            errMessage: 'Id sach ko ton tai'
                        })
                    } else {
                        let ngayMuon = moment().format('DD/MM/YYYY');
                        await db.PhieuMuon.create({
                            maNguoiDung: data.idUser,
                            maSach: data.idBook,
                            ngayMuon: ngayMuon,
                            tinhTrang: 'Chưa duyệt',
                            ngayTraDuKien: data.ngayTra,
                            gia: data.gia
                        })

                    }
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

let duyetPhieuMuon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.idPhieuMuon) {
                resolve({
                    errCode: 1,
                    errMessage: 'Dữ liệu không hợp lệ hoặc thiếu idPhieuMuon'
                });
            } else {
                let nhanVien = await db.User.findOne({
                    where: {
                        id: data.idNhanVien,
                    }
                })
                if (!nhanVien) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Nhan vien ko ton tai'
                    })
                } else {
                    let phieuMuon = await db.PhieuMuon.findOne({
                        where: {
                            id: data.idPhieuMuon,
                            tinhTrang: 'Chưa duyệt'
                        },
                        raw: false
                    });
                    if (!phieuMuon) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Phiếu đã được duyệt hoặc không tồn tại'
                        });
                    } else {
                        phieuMuon.tinhTrang = 'Đang mượn';
                        phieuMuon.maNhanVien = data.idNhanVien

                        let soLuongSach = await db.Sach.findOne({
                            where: { id: phieuMuon.maSach },
                            raw: false
                        });
                        if (!soLuongSach) {
                            resolve({
                                errCode: 3,
                                errMessage: 'Sách không tồn tại'
                            });
                        } else if (soLuongSach.soLuong <= 0) {
                            resolve({
                                errCode: 4,
                                errMessage: 'Số lượng sách không đủ'
                            });
                        } else {
                            soLuongSach.soLuong -= 1;
                            await soLuongSach.save();
                            await phieuMuon.save();
                            resolve({
                                errCode: 0,
                                errMessage: 'Thành công'
                            });
                        }
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let huyPhieuMuon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chưa có data'
                })
            } else {
                let phieuMuon = await db.PhieuMuon.findOne({
                    where: {
                        id: data.id,
                        tinhTrang: 'Chưa duyệt'
                    },
                    raw: false
                })
                if (!phieuMuon) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Phiếu đã được duyệt hoặc không tồn tại'
                    })
                } else {
                    phieuMuon.tinhTrang = 'Đã hủy'
                    await phieuMuon.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Thành công'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let traSach = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Không có dữ liệu đầu vào'
                });
            } else {
                // 1. Xác minh dữ liệu đầu vào
                const { idSach } = data;
                if (!idSach) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Thiếu thông tin về ID sách'
                    });
                }

                // 2. Tìm phiếu mượn tương ứng với sách được trả
                let phieuMuon = await db.PhieuMuon.findOne({
                    where: {
                        id: data.id,
                        maSach: idSach,
                        tinhTrang: 'Đang mượn'
                    }
                });

                if (!phieuMuon) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Không tìm thấy phiếu mượn tương ứng với sách đã trả'
                    });
                }

                // 3. Tính số ngày trễ
                const ngayTraDuKien = moment(phieuMuon.ngayTraDuKien, 'DD/MM/YYYY');
                const ngayTraThucTe = moment();
                const soNgayTre = ngayTraThucTe.diff(ngayTraDuKien, 'DD/MM/YYYY');

                // 4. Tính số tiền phạt
                let soTienPhat = 0;
                if (soNgayTre > 0) {
                    soTienPhat = soNgayTre * 2000;
                }

                // 5. Cập nhật trạng thái phiếu mượn
                await db.PhieuMuon.update(
                    { tinhTrang: 'Đã trả' },
                    { where: { id: phieuMuon.id } }
                );

                // 6. Cập nhật số lượng sách
                await db.Sach.increment('soLuong', { by: 1, where: { id: idSach } });

                // 7. Tạo phiếu trả
                await db.PhieuTra.create({
                    maPhieuMuon: phieuMuon.id,
                    ngayTra: ngayTraThucTe.format('DD/MM/YYYY'),
                    soTienPhat: soTienPhat
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Trả sách thành công. Số tiền phạt: ' + soTienPhat + 'đ'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


let layTraSach = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.PhieuTra.findAll({
                include: [
                    { model: db.PhieuMuon, as: 'phieuMuon' }
                ],
                order: [['createdAt', 'DESC']],
                raw:false,
                nest: true
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
    layPhieuMuon, taoPhieuMuon,
    duyetPhieuMuon, huyPhieuMuon,
    traSach, layTraSach
}