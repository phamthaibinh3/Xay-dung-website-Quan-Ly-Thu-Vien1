'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      taiKhoan: 'phamthaibinh',
      matKhau: '123456',
      hoTen: 'Pham Thai Binh',
      email: 'thaibinh1004@gamil.com',
      diaChi: 'Đà Nẵng',
      dienThoai: '0796782810',
      vaitro: 'R1',
      gioTinh: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
