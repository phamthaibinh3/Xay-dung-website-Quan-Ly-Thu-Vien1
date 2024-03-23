'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lichlams', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            soLuongDangKi: {
                type: Sequelize.INTEGER
            },
            maxSoLuong: {
                type: Sequelize.INTEGER
            },
            ngay: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            nhanVienId: {
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
        await queryInterface.dropTable('lichlams');
    }
};