const Sequelize = require('sequelize');

const {
  DATABASE, USERNAME, PASSWORD,
} = process.env;

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

});

module.exports = db;
