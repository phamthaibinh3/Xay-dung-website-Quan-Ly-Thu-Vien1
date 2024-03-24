'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('saches', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tieuDe: {
                type: Sequelize.STRING
            },
            maNXB: {
                type: Sequelize.INTEGER
            },
            namXuatBan: {
                type: Sequelize.STRING
            },
            maDanhMuc: {
                type: Sequelize.INTEGER
            },
            soLuong: {
                type: Sequelize.INTEGER
            },
            maHoaDon: {
                type: Sequelize.INTEGER
            },
            gia: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('saches');
    }
};