'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TheThuVien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TheThuVien.init({
        maNguoiDung: DataTypes.INTEGER,
        ngayCap: DataTypes.DATE,
        ngayHetHan: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'TheThuVien',
    });
    return TheThuVien;
};