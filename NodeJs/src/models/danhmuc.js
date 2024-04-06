'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DanhMuc extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DanhMuc.hasMany(models.Sach, {
                foreignKey: 'maDanhMuc',
                as: 'SachData', // Tùy chọn: đặt tên cho mối quan hệ
            });
        }
    };
    DanhMuc.init({
        tenDanhMuc: DataTypes.STRING,
        anh: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'DanhMuc',
    });
    return DanhMuc;
};