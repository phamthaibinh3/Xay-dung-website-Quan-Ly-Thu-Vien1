'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('HoaDon', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ngayMua: {
                type: Sequelize.DATE
            },
            maNguoiDung: {
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
        await queryInterface.dropTable('HoaDon');
    }
};