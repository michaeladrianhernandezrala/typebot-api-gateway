const Sequelize = require('sequelize');

const {
  DATABASE, USERNAME, PASSWORD, dbConfig,
} = process.env.sequelize;

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, dbConfig);

module.exports = db;
