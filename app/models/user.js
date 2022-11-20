const { DataTypes } = require('sequelize');
const db = require('../lib/db');

const User = db.define('User', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'password',
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
}, { tableName: 'user' });

module.exports = User;
