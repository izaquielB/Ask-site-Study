const sequelize = require('sequelize');

const connection = new sequelize('askplataform', 'root', 'Silva@1012', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;