'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    taiKhoan: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    email: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    dienThoai: DataTypes.INTEGER,
    vaiTro: DataTypes.STRING,
    gioTinh: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};