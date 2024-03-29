'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'vaiTro', as: 'vaiTroData' })
            Allcode.hasMany(models.User, { foreignKey: 'gioiTinh', as: 'gioiTinhData' })
            Allcode.hasMany(models.LichLam, { foreignKey: 'timeType', as: 'timeTypeData' })
            Allcode.hasMany(models.Sach, {
                foreignKey: 'maDanhMuc',
                as: 'DanhMucData',
            });
        }
    };
    Allcode.init({
        type: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};