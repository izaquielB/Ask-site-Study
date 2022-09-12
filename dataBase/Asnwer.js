const sequelize = require('sequelize');
const connection = require('./ConnectDb');

const Answer = connection.define('answer', {
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    askID: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
})

Answer.sync({ force: false });
module.exports = Answer;