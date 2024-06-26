'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PhieuTra extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PhieuTra.belongsTo(models.PhieuMuon, { foreignKey: 'maPhieuMuon', as: 'phieuMuon' });
        }
    };
    PhieuTra.init({
        maPhieuMuon: DataTypes.INTEGER,
        ngayTra: DataTypes.STRING,
        soTienPhat: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'PhieuTra',
    });
    return PhieuTra;
};