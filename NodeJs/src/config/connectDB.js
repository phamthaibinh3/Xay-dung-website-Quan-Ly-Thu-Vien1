const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('quanlythuvien', 'root', null, {
    host: 'localhost',
    dialect: "mysql",
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});

let connetDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connetDB;
