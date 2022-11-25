const Sequelize = require('sequelize');

// TODO: Correct the parameter USER_DATABASE
const {
  DATABASE, USER_DATABASE, PASSWORD,
} = process.env;

const db = new Sequelize(DATABASE, USER_DATABASE, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

});

module.exports = db;
