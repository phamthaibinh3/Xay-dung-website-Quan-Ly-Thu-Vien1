'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PhieuMuon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    PhieuMuon.init({
        maNguoiDung: DataTypes.INTEGER,
        maSach: DataTypes.INTEGER,
        ngayMuon: DataTypes.DATE,
        ngayTraDuKien: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'PhieuMuon',
    });
    return PhieuMuon;
};