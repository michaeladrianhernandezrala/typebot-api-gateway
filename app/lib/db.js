const Sequelize = require('sequelize');

const { DATABASE, USERNAME, PASSWORD } = require('../config').sequelize;

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

});

module.exports = db;
