'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Markdown.init({
        noiDungHTML: DataTypes.TEXT('long'),
        noiDungMarkdown: DataTypes.TEXT('long'),
        moTa: DataTypes.TEXT('long'),
        nhanVienId: DataTypes.INTEGER,
        sachId: DataTypes.INTEGER,
        chuyenMucId: DataTypes.INTEGER,
        theLoaiSachId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};