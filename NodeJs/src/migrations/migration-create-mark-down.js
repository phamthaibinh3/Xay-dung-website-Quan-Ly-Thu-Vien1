'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            noiDungHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            noiDungMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            moTa: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            nhanVienId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            sachId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            chuyenMucId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            theLoaiSachId: {
                allowNull: true,
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
        await queryInterface.dropTable('Markdowns');
    }
};