const sequelize = require('sequelize');
const connection = require('./ConnectDb');

const Ask = connection.define('ask', {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    }
});

Ask.sync({ force: false });

module.exports = Ask;