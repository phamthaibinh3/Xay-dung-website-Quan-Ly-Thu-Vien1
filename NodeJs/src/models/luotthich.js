'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LuotThich extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Mối quan hệ với User
            LuotThich.belongsTo(models.User, {
                foreignKey: 'maNguoiDung',
                as: 'LuotThichUser',
            });

            // Mối quan hệ với Sach
            LuotThich.belongsTo(models.Sach, {
                foreignKey: 'maSach',
                as: 'LuotThichSach',
            });
        }
    };
    LuotThich.init({
        maNguoiDung: DataTypes.INTEGER,
        maSach: DataTypes.INTEGER,
        trangThai: DataTypes.BOOLEAN

    }, {
        sequelize,
        modelName: 'LuotThich',
    });
    return LuotThich;
};