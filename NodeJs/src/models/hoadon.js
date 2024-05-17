'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HoaDon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            HoaDon.belongsTo(models.Sach, { foreignKey: 'maSach', as: 'Sach' });
            HoaDon.belongsTo(models.User, { foreignKey: 'maNguoiDung', as: 'NguoiDung' });
        }
    };
    HoaDon.init({
        maSach: DataTypes.INTEGER,
        maNguoiDung: DataTypes.INTEGER,
        gia: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'HoaDon',
    });
    return HoaDon;
};