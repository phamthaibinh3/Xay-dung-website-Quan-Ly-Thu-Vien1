'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sach extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Sach.belongsTo(models.DanhMuc, {
                foreignKey: 'maDanhMuc',
                as: 'SachData', // Tùy chọn: đặt tên cho mối quan hệ
            });
            Sach.belongsTo(models.Allcode, {
                foreignKey: 'maDanhMuc',
                as: 'DanhMucData',
            });


        }
    };
    Sach.init({
        tieuDe: DataTypes.STRING,
        maNXB: DataTypes.STRING,
        namXuatBan: DataTypes.STRING,
        maDanhMuc: DataTypes.STRING,
        soLuong: DataTypes.INTEGER,
        maHoaDon: DataTypes.INTEGER,
        gia: DataTypes.INTEGER,
        tacGia: DataTypes.STRING,
        anh: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Sach',
    });
    return Sach;
};