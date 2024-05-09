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
            PhieuMuon.belongsTo(models.User, { foreignKey: 'maNguoiDung', as: 'NguoiMuon' });
            PhieuMuon.belongsTo(models.Sach, { foreignKey: 'maSach', as: 'SachMuon' });

            PhieuMuon.hasOne(models.PhieuTra, { foreignKey: 'maPhieuMuon', as: 'phieuMuon' });
        }
    };
    PhieuMuon.init({
        maNguoiDung: DataTypes.INTEGER,
        maSach: DataTypes.INTEGER,
        ngayMuon: DataTypes.STRING,
        tinhTrang: DataTypes.STRING,
        ngayTraDuKien: DataTypes.STRING,
        maNhanVien: DataTypes.INTEGER,
        gia: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'PhieuMuon',
    });
    return PhieuMuon;
};