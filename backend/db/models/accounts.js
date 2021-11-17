'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Account extends Model {
    static associate ({ User, Item }) {
      Account.belongsTo(User, { foreignKey: 'user_id' });
      Account.hasMany(Item, { foreignKey: 'account_id' });
    }
  }

  Account.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    historic_balance: DataTypes.TEXT,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW')
    }
  }, {
    sequelize,
    modelName: 'Accounts'
  });

  return Account;
};
