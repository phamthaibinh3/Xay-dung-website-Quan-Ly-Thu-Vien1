'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('hoadontts', {

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
                type: Sequelize.STRING
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
            tacGia: {
                type: Sequelize.STRING
            },
            maLoaiSach: {
                type: Sequelize.STRING
            },
            anh: {
                type: Sequelize.BLOB('long')
            },
            luotThich: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            moTa: {
                type: Sequelize.TEXT,
            },
            ngonNgu: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('hoadontts');
    }
};