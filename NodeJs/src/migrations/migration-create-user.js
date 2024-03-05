'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taiKhoan: {
        type: Sequelize.STRING
      },
      matKhau: {
        type: Sequelize.STRING
      },
      hoTen: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gioTinh: {
        type: Sequelize.BOOLEAN
      },
      diaChi: {
        type: Sequelize.STRING
      },
      dienThoai: {
        type: Sequelize.INTEGER
      },
      vaiTro: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};