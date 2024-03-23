'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LichLam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LichLam.belongsTo(models.Allcode, {
                foreignKey: 'timeType', targetKey: 'keyMap',as: 'timeTypeData'
            })
        }
    };
    LichLam.init({
        soLuongDangKi: DataTypes.INTEGER,
        maxSoLuong: DataTypes.INTEGER,
        ngay: DataTypes.STRING,
        timeType: DataTypes.STRING,
        nhanVienId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'LichLam',
    });
    return LichLam;
};