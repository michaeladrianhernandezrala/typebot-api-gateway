const { DataTypes } = require('sequelize');
const db = require('../lib/db');
const Account = require('./account');

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
    allowNull: true,
    field: 'name',
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'lastname',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'password',
  },
  userType: {
    type: DataTypes.ENUM('human', 'server'),
    allowNull: false,
    field: 'user_type',
  },
  roleType: {
    type: DataTypes.ENUM('account_admin', 'application/json'),
    allowNull: false,
    field: 'role_type',
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
  userImage: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image',
  },
  accountId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'account',
      key: 'id',
    },
    field: 'account_id',
  },
  secretKey: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'secret_key',
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'lang',
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'enabled',
  },
}, { tableName: 'user' });

User.belongsTo(Account, { as: 'account', foreginKey: 'account_id' });

module.exports = User;
