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
      User.belongsTo(models.Allcode, { foreignKey: 'vaiTro', targetKey: 'keyMap', as: 'vaiTroData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gioiTinh', targetKey: 'keyMap', as: 'gioiTinhData' })

      User.hasOne(models.Markdown, { foreignKey: 'nhanVienId' })

      User.hasMany(models.LuotThich, {
        foreignKey: 'maNguoiDung',
        as: 'LuotThichUser',
      });
      User.hasMany(models.PhieuMuon, { foreignKey: 'maNguoiDung', as: 'PhieuMuon' });

      User.hasOne(models.TheThuVien, { foreignKey: 'maNguoiDung', as: 'nguoiDung' });
      User.hasMany(models.HoaDonTT, { foreignKey: 'maNguoiDung', as: 'HoaDonTTUser' });

    }
  };
  User.init({
    taiKhoan: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    email: DataTypes.STRING,
    // diaChi: DataTypes.STRING,
    tinhThanh: DataTypes.STRING,
    quanHuyen: DataTypes.STRING,
    phuongXa: DataTypes.STRING,
    dienThoai: DataTypes.INTEGER,
    vaiTro: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    anh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};