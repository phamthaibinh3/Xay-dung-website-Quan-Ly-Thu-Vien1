'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TheLoaiSach extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TheLoaiSach.init({
        tenTheLoai: DataTypes.STRING,
        moTa: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'TheLoaiSach',
    });
    return TheLoaiSach;
};