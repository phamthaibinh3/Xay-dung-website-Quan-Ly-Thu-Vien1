'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NhaXuatBan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    NhaXuatBan.init({
        tenNXB: DataTypes.STRING,
        diaChi: DataTypes.STRING,
        SDT: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'NhaXuatBan',
    });
    return NhaXuatBan;
};