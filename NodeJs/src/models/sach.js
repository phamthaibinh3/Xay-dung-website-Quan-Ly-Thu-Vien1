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
            // define association here
        }
    };
    Sach.init({
        tieuDe: DataTypes.STRING,
        maNXB: DataTypes.STRING,
        namXuatBan: DataTypes.STRING,
        maDanhMuc: DataTypes.INTEGER,
        soLuong: DataTypes.INTEGER,
        maHoaDon: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Sach',
    });
    return Sach;
};