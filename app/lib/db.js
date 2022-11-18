const Sequelize = require('sequelize');

const {
  DATABASE, USERNAME, PASSWORD, dbConfig,
} = require('../config/config').sequelize;

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, dbConfig);

module.exports = db;
