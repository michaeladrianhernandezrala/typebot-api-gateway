const { DataTypes } = require('sequelize');
const db = require('../lib/db');
const Account = require('./account');

const Application = db.define('Application', {
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
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: true,
    field: 'updated_at',
  },
  accountId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'account_id',
    references: {
      model: 'account',
      key: 'id',
    },
  },
  chatbotEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'chatbot_enabled',
  },
  drawerEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'drawer_enabled',
  },
}, { tableName: 'application' });

Application.belongsTo(Account, { as: 'account', foreignKey: 'account_id' });

module.exports = Application;
