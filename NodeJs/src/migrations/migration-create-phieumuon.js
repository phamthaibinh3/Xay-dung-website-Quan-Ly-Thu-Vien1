'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phieumuons', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            maNguoiDung: {
                type: Sequelize.INTEGER
            },
            maSach: {
                type: Sequelize.INTEGER
            },
            ngayMuon: {
                type: Sequelize.STRING
            },
            tinhTrang: {
                type: Sequelize.STRING
            },
            ngayTraDuKien: {
                type: Sequelize.STRING
            },
            maNhanVien: {
                type: Sequelize.INTEGER
            },
            gia: {
                type: Sequelize.DOUBLE
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
        await queryInterface.dropTable('phieumuons');
    }
};