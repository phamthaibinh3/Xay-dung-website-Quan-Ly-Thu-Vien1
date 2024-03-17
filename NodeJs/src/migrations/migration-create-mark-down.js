'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdown', {
            // noiDungHTML: DataTypes.TEXT('long'),
            // noiDungMarkdown: DataTypes.TEXT('long'),
            // moTa: DataTypes.TEXT('long'),
            // nhanVienId: DataTypes.INTEGER,
            // sachId: DataTypes.INTEGER,
            // chuyenMucId: DataTypes.INTEGER,
            // theLoaiSachId: DataTypes.INTEGER
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            noiDungHTML: {
                type: Sequelize.TEXT('long')
            },
            moTa: {
                noiDungMarkdown: Sequelize.TEXT('long')
            },
            nhanVienId: {
                noiDungMarkdown: Sequelize.INTEGER
            },
            sachId: {
                noiDungMarkdown: Sequelize.INTEGER
            },
            chuyenMucId: {
                noiDungMarkdown: Sequelize.INTEGER
            },
            theLoaiSachId: {
                noiDungMarkdown: Sequelize.INTEGER
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
        await queryInterface.dropTable('markdown');
    }
};