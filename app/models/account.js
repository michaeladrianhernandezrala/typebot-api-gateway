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
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'name',
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
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'enabled',
  },
}, { tableName: 'account' });

module.exports = Account;
