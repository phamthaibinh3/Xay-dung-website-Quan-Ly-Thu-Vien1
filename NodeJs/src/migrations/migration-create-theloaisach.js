'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('theloaisaches', {

            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            tenTheLoai: {
                type: Sequelize.STRING
            },
            moTa: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('theloaisaches');
    }
};