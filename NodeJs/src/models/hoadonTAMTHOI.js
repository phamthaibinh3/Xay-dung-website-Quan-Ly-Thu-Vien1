'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HoaDonTT extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    HoaDonTT.init({
        tieuDe: DataTypes.STRING,
        maNXB: DataTypes.STRING,
        namXuatBan: DataTypes.STRING,
        maDanhMuc: DataTypes.STRING,
        soLuong: DataTypes.INTEGER,
        maHoaDon: DataTypes.INTEGER,
        gia: DataTypes.INTEGER,
        tacGia: DataTypes.STRING,
        maLoaiSach: DataTypes.STRING,
        anh: DataTypes.BLOB('long'),
        luotThich: DataTypes.INTEGER,
        moTa: DataTypes.TEXT,
        ngonNgu: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'HoaDonTT',
    });
    return HoaDonTT;
};