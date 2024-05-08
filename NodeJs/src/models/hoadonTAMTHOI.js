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
            HoaDonTT.belongsTo(models.User, { foreignKey: 'maNguoiDung', as: 'HoaDonTTUser' });
            HoaDonTT.belongsTo(models.Sach, { foreignKey: 'maSach', as: 'HoaDonTTSach' });
        }
    };
    HoaDonTT.init({
        maSach: DataTypes.INTEGER,
        maNguoiDung: DataTypes.INTEGER,
        gia: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'HoaDonTT',
    });
    return HoaDonTT;
};