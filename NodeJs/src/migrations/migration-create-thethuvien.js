'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TheThuVien', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            maNguoiDung: {
                type: Sequelize.INTEGER
            },
            ngayCap: {
                type: Sequelize.DATE
            },
            ngayHetHan: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('TheThuVien');
    }
};