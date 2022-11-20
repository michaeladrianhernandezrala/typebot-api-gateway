const { DataTypes } = require('sequelize');
const db = require('../lib/db');

const Account = db.define('Account', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'updated_at',
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'user_id',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image',
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'lang',
  },
}, { tableName: 'account' });

module.exports = Account;
