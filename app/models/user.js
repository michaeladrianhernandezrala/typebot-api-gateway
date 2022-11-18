const { DataTypes } = require('sequelize');
const db = require('../lib/db');

const User = db.define('user', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'lastname',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email',
    unique: true,
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNullL: false,
    field: 'updated_at',
  },
  accountId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'account_id',
  },
});

module.exports = User;
